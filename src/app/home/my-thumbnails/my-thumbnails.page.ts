import { Component, OnInit, OnDestroy } from '@angular/core';
import { Thumbnail } from 'src/app/models/thumbnail';
import { ThumbnailsService } from 'src/app/services/thumbnails.service';
import { User } from 'src/app/models/user';
import { Subscription } from 'rxjs';
import { LoadingController, AlertController, NavController } from '@ionic/angular';

@Component({
  selector: 'app-my-thumbnails',
  templateUrl: './my-thumbnails.page.html',
  styleUrls: ['./my-thumbnails.page.scss'],
})

export class MyThumbnailsPage implements OnInit, OnDestroy {

  thumbnails: Thumbnail[];
  private thumbnailSub: Subscription;
  user: User;
  contentLoaded = false;
  
  constructor(
    private thumbnailsService: ThumbnailsService,
    private loadingCtrl: LoadingController,
    private alertCtrl: AlertController,
    private navCtrl: NavController) {
    this.thumbnails = [];
  }

  ngOnInit() {
    this.thumbnailSub = this.thumbnailsService.thumbnails.subscribe(thumbnails => {
      this.thumbnails = thumbnails;
    })
  }

  ionViewWillEnter() {
    this.thumbnailsService.fetchMyThumbnails().subscribe(thumbnails => {
      this.thumbnails = thumbnails;
      this.contentLoaded = true;
    });
  }

  onDeleteThumbnail(thumbnailId: string) {
    this.alertCtrl.create({
      header: 'Confirm deletion',
      message: 'Are you sure you want to permanently delete this thumbnail?',
      buttons: [{
        text: 'Cancel', handler: () => {
          this.navCtrl.navigateBack('/home/my-thumbnails');
        }
      },
      {
        text: 'Delete', handler: () => {
          this.loadingCtrl.create({
            message: 'Deleting...'
          }).then(loadingEl => {
            loadingEl.present();
            this.thumbnailsService.deleteThumbnail(thumbnailId).subscribe(() => {
              loadingEl.dismiss();
              this.thumbnails = this.thumbnails.filter(thumbnail => thumbnail._id !== thumbnailId);
            });
          })
        }
      }]
    }).then(alertEl => {
      alertEl.present();
    })
  }

  doRefresh(ev: any) {
    this.ionViewWillEnter();

    setTimeout(() => {
      ev.target.complete();
    }, 500);
  }

  ngOnDestroy() {
    if(this.thumbnailSub) {
      this.thumbnailSub.unsubscribe();
    }
  }

}
