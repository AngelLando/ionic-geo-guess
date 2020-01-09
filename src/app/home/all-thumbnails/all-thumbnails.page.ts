import { Component, OnInit, OnDestroy } from '@angular/core';
import { Thumbnail } from 'src/app/models/thumbnail';
import { ThumbnailsService } from 'src/app/services/thumbnails.service';
import { User } from 'src/app/models/user';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-all-thumbnails',
  templateUrl: './all-thumbnails.page.html',
  styleUrls: ['./all-thumbnails.page.scss'],
})

export class AllThumbnailsPage implements OnInit, OnDestroy {

  thumbnails: Thumbnail[];
  private thumbnailSub: Subscription;
  user: User;
  contentLoaded = false;

  constructor(private thumbnailsService: ThumbnailsService) {
  }

  ngOnInit() {
    this.thumbnailSub = this.thumbnailsService.thumbnails.subscribe(thumbnails => {
      this.thumbnails = thumbnails;
    })
  }

  ionViewWillEnter() {
    this.thumbnailsService.fetchThumbnails().subscribe(thumbnails => {
      this.thumbnails = thumbnails;
      this.contentLoaded = true;
    });
  }

/*   ionViewDidLoad() {
    const url = 'https://comem-archioweb-2019-2020-g.herokuapp.com/thumbnails';
    this.http.get(url).subscribe(thumbnails => {
      console.log(`Thumbnails loaded`, thumbnails);
    });
  } */

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