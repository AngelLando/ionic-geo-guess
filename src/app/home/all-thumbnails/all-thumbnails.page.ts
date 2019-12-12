import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-all-thumbnails',
  templateUrl: './all-thumbnails.page.html',
  styleUrls: ['./all-thumbnails.page.scss'],
})
export class AllThumbnailsPage implements OnInit {

  constructor(
    private auth: AuthService,
    public http: HttpClient
  ) { }

  ngOnInit() {
  }

  ionViewDidLoad() {
    const url = 'https://comem-archioweb-2019-2020-g.herokuapp.com/thumbnails';
    this.http.get(url).subscribe(thumbnails => {
      console.log(`Thumbnails loaded`, thumbnails);
    });
  }

}
