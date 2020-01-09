import { Component, OnInit } from '@angular/core';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { QimgImage } from '../../models/qimg-image';
import { PictureService } from '../../services/picture/picture.service';
import { Geoposition } from '@ionic-native/geolocation/ngx';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { Coords } from 'leaflet';


@Component({
  selector: 'app-create-thumbnail',
  templateUrl: './create-thumbnail.page.html',
  styleUrls: ['./create-thumbnail.page.scss'],
})
export class CreateThumbnailPage implements OnInit {
  pictureData: string;
  coords:Coordinates;
  picture:QimgImage;
  //take picture
  takePicture() {
    this.pictureService.takeAndUploadPicture().subscribe(picture => {
      this.picture = picture;
      console.log(picture);
      
    }, err => {
      console.warn('Could not take picture', err);
    });
  }

  constructor(
    private camera: Camera,
    private geolocation: Geolocation,
    private pictureService:PictureService
    ) { 

    }

  ngOnInit() {
    this.geolocation.getCurrentPosition().then((position: Geoposition) => {
      this.coords = position.coords;
     console.log(`User is at ${this.coords.longitude}, ${this.coords.latitude}`);
   }).catch(err => {
     console.warn(`Could not retrieve user position because: ${err.message}`);
   });
  }

}
