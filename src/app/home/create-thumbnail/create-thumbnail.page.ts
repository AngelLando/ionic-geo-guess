import { Component, OnInit } from '@angular/core';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';

@Component({
  selector: 'app-create-thumbnail',
  templateUrl: './create-thumbnail.page.html',
  styleUrls: ['./create-thumbnail.page.scss'],
})
export class CreateThumbnailPage implements OnInit {
  pictureData: string;
  //
  takePicture() {
    console.log(this.camera);

    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.FILE_URI,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    };
    this.camera.getPicture(options).then(pictureData => {
      this.pictureData = pictureData;
    }).catch(err => {
      console.warn(`Could not take picture because: ${err.message}`);
    });
  }
  constructor() { }
  private camera: Camera

  ngOnInit() {
  }

}
