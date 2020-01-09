import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ThumbnailsService } from 'src/app/services/thumbnails.service';
import { NavController, AlertController } from '@ionic/angular';

import { Thumbnail } from 'src/app/models/thumbnail';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-edit-thumbnail',
  templateUrl: './edit-thumbnail.page.html',
  styleUrls: ['./edit-thumbnail.page.scss'],
})
export class EditThumbnailPage implements OnInit {
  thumbnail: Thumbnail;
  thumbnailId: string;
  form: FormGroup;
  isLoading = false;
  isUpdating = false;
  private thumbnailSub: Subscription;

  constructor(
    private route: ActivatedRoute,
    private thumbnailsService: ThumbnailsService,
    private navCtrl: NavController,
    private alertCtrl: AlertController
    ) {}

  ngOnInit() {
    this.route.paramMap.subscribe(paramMap => {
      if(!paramMap.has('thumbnailId')) {
        this.navCtrl.navigateBack('/home/my-thumbnails');
        return;
      }
      this.thumbnailId = paramMap.get('thumbnailId');
      this.isLoading = true;
      this.thumbnailSub = this.thumbnailsService
      .getThumbnail(paramMap.get('thumbnailId'))
      .subscribe(
        thumbnail => {
          this.thumbnail = thumbnail;
          this.form = new FormGroup({
            title: new FormControl(this.thumbnail.title, {
              updateOn: 'blur',
              validators: [Validators.required, Validators.maxLength(60)]
            })
          });
          this.isLoading = false;
        }, error => {
          this.alertCtrl.create({
            header: 'An error occured!',
            message: 'Thumbnail could not be fetched. Please try again later.',
            buttons: [{text: 'Okay', handler: () => {
              this.navCtrl.navigateBack('/home/my-thumbnails');
            }}]
          }).then(alertEl => {
            alertEl.present();
          })
        }
      )
    });
  }

  onUpdateThumbnail() {
    if(!this.form.valid) {
      return;
    }
    this.isUpdating = true;
    const data = {
      "_id": this.thumbnail._id,
      "title": this.form.value.title
    }
    this.thumbnailsService.updateThumbnail(data).subscribe(() => {
      this.isUpdating = false;
      this.form.reset();
      this.navCtrl.navigateBack('/home/my-thumbnails');
    });
  }

}