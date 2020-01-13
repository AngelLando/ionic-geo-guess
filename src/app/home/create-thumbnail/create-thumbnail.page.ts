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
  //take picture
  takePicture() {
    
    this.pictureService.takeAndUploadPicture().subscribe(picture => {
      this.picture = picture;
  
      this.geolocation.getCurrentPosition().then((position: Geoposition) => {
        this.coords = position.coords;
       console.log(`User is at ${this.coords.longitude}, ${this.coords.latitude}`);
     }).catch(err => {
       console.warn(`Could not retrieve user position because: ${err.message}`);
     });
    }, err => {
      console.warn('Could not take picture', err);
    });
  }

  constructor(
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
//get form values

this.auth.getUser().subscribe(user => {
  this.user = user;
});
const data = {
  "title": form.value.title,
  "user_id": this.user._id,
  "location": {"type": "Point", "coordinates": [this.coords.longitude, this.coords.latitude ]},
  "img":this.picture.url
}
try {
  this.thumbnailsService.postThumbnail(data)
}
catch(error) {
  console.error(error);
  // expected output: ReferenceError: nonExistentFunction is not defined
  // Note - error messages will vary depending on browser
}
this.navCtrl.navigateBack('/home/my-thumbnails');

  }

}
