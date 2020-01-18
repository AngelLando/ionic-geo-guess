import { Component, OnInit } from '@angular/core';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { QimgImage } from '../../models/qimg-image';
import { PictureService } from '../../services/picture/picture.service';
import { Geoposition } from '@ionic-native/geolocation/ngx';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { Coords } from 'leaflet';
import { Thumbnail } from 'src/app/models/thumbnail';
import { ThumbnailsService } from 'src/app/services/thumbnails.service';
import { User } from 'src/app/models/user';
import { NgForm } from '@angular/forms';
import { AuthService } from '../../auth/auth.service';
import { NavController, AlertController } from '@ionic/angular';
import { WebsocketService } from '../../services/websocket.service';
import { Toast } from '@ionic-native/toast/ngx';






@Component({
  selector: 'app-create-thumbnail',
  templateUrl: './create-thumbnail.page.html',
  styleUrls: ['./create-thumbnail.page.scss'],
})
export class CreateThumbnailPage implements OnInit {
  
  thumbnails: Thumbnail[];
  user: User;
  pictureData: string;
  coords:Coordinates;
  picture:QimgImage;
  loginError: boolean;
  isLoading=false;
  isLoadingPicture=false;
  imgNotSet=false;

  //take picture
  takePicture() {
    this.isLoadingPicture=true;
    this.pictureService.takeAndUploadPicture().subscribe(picture => {
      this.picture = picture;
  
      this.geolocation.getCurrentPosition().then((position: Geoposition) => {
        this.coords = position.coords;
     }).catch(err => {
       console.warn(`Could not retrieve user position because: ${err.message}`);
       this.isLoadingPicture=false;
     });
    }, err => {
      console.warn('Could not take picture', err);
      this.isLoadingPicture=false;
    });
  }

  constructor(
    private wsService: WebsocketService,
    private toast: Toast,
    private navCtrl: NavController,
    private auth: AuthService,
    private thumbnailsService:ThumbnailsService,
    private camera: Camera,
    private geolocation: Geolocation,
    private pictureService:PictureService
    ) { 
      this.thumbnails=[];
      

    }

  ngOnInit() {
 
  }


  onSubmit(form: NgForm) {

    // Do not do anything if the form is invalid.
    if (form.invalid) {
      return;
    }
    this.isLoading = true;


    if(this.picture==null){
      this.isLoading=false;
      this.imgNotSet=true;
      return;
    }

   // Get user connected
this.auth.getUser().subscribe(user => {
  this.user = user;
})

//get data
const data = {
  "title": form.value.title,
  "user_id": this.user._id,
  "location": {"type": "Point", "coordinates": [this.coords.longitude, this.coords.latitude ]},
  "img":this.picture.url
}

 this.thumbnailsService.postThumbnail(data).subscribe({
  next: () => {
    this.isLoading = false;
    this.navCtrl.navigateBack('/home/my-thumbnails');

  },
  error: err => {
    this.loginError = true;
    console.warn(`Posted Thumbnail failed: ${err.message}`);
  }
  })
  }
}
