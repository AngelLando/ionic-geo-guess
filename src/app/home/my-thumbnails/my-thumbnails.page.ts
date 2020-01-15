import { Component, OnInit } from '@angular/core';
import { Thumbnail } from 'src/app/models/thumbnail';
import { ThumbnailsService } from 'src/app/services/thumbnails.service';
import { User } from 'src/app/models/user';
import { LoadingController, AlertController, NavController } from '@ionic/angular';
import { AuthService } from 'src/app/auth/auth.service';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-my-thumbnails',
  templateUrl: './my-thumbnails.page.html',
  styleUrls: ['./my-thumbnails.page.scss'],
})

export class MyThumbnailsPage implements OnInit {

  thumbnails: Thumbnail[];
  user: User;
  contentLoaded = false;
  
  constructor(
    private thumbnailsService: ThumbnailsService,
    private usersService: UsersService,
    private loadingCtrl: LoadingController,
    private alertCtrl: AlertController,
    private navCtrl: NavController) {
    this.thumbnails = [];
  }

  ngOnInit() {
  }

  ionViewWillEnter() {
    this.thumbnailsService.fetchMyThumbnails().subscribe(thumbnails => {
      this.thumbnails = thumbnails;
      this.thumbnails.sort((a, b) => +new Date(b.created_at) - +new Date(a.created_at));
      this.contentLoaded = true;
      this.getNumberofDays();

      this.thumbnails.forEach(thumbnail => {
        this.usersService.getUser(thumbnail.user_id).subscribe(res => {
          thumbnail.username = res.username;      
        });
      })
    });
  }

  getNumberofDays(){
    this.thumbnails.forEach(function(thumbnail){
      const newDate = new Date(thumbnail.created_at)
      const today = new Date();
      var Difference_In_Time = today.getTime() - newDate.getTime(); 
      var Difference_In_Days = Difference_In_Time / (1000 * 3600 * 24); 
      thumbnail.numberOfDays=Math.floor(Difference_In_Days);
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

}
