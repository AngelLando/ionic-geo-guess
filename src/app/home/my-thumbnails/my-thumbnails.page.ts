import { Component, OnInit, OnDestroy } from '@angular/core';
import { Thumbnail } from 'src/app/models/thumbnail';
import { ThumbnailsService } from 'src/app/services/thumbnails.service';
import { User } from 'src/app/models/user';
import { Subscription } from 'rxjs';

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
  
  constructor(private thumbnailsService: ThumbnailsService) {
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
