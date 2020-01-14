import { Component, OnInit } from '@angular/core';
import { Thumbnail } from 'src/app/models/thumbnail';
import { ThumbnailsService } from 'src/app/services/thumbnails.service';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-all-thumbnails',
  templateUrl: './all-thumbnails.page.html',
  styleUrls: ['./all-thumbnails.page.scss'],
})

export class AllThumbnailsPage implements OnInit {

  thumbnails: Thumbnail[];
  user: User;
  contentLoaded = false;

  constructor(
    private thumbnailsService: ThumbnailsService,
    private auth: AuthService
    ) { }

  ngOnInit() {
  }

  ionViewWillEnter() {
    this.thumbnailsService.fetchThumbnails().subscribe(thumbnails => {
      this.thumbnails = thumbnails;
      this.thumbnails.sort((a, b) => +new Date(b.created_at) - +new Date(a.created_at));
      this.contentLoaded = true;
      this.getNumberofDays();
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

  doRefresh(ev: any) {
    this.ionViewWillEnter();

    setTimeout(() => {
      ev.target.complete();
    }, 500);
  }

}