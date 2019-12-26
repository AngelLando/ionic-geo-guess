import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Thumbnail } from 'src/app/models/thumbnail';

@Component({
  selector: 'app-all-thumbnails',
  templateUrl: './all-thumbnails.page.html',
  styleUrls: ['./all-thumbnails.page.scss'],
})

export class AllThumbnailsPage implements OnInit {

  thumbnails: Thumbnail[];
  contentLoaded = false;

  constructor(public http: HttpClient) {
    this.thumbnails = [];
  }

  ngOnInit() {
    const url = `${environment.apiUrl}/thumbnails`;
    this.http.get<Thumbnail[]>(url).subscribe(thumbnails => {
      this.thumbnails = thumbnails;
      this.contentLoaded = true;
      console.log(`Thumbnails loaded`, thumbnails);
    });
  }

  ionViewDidLoad() {
    const url = 'https://comem-archioweb-2019-2020-g.herokuapp.com/thumbnails';
    this.http.get(url).subscribe(thumbnails => {
      console.log(`Thumbnails loaded`, thumbnails);
    });
  }

  doRefresh(ev: any) {
    this.contentLoaded = false;

    this.ngOnInit();

    setTimeout(() => {
      ev.target.complete();
    }, 500);
  }

}