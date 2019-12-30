import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { AuthService } from 'src/app/auth/auth.service';
import { Thumbnail } from 'src/app/models/thumbnail';
import { User } from 'src/app/models/user';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-my-thumbnails',
  templateUrl: './my-thumbnails.page.html',
  styleUrls: ['./my-thumbnails.page.scss'],
})
export class MyThumbnailsPage implements OnInit {

  thumbnails: Thumbnail[];
  user: User;

  constructor(
    public http: HttpClient,
    private auth: AuthService,
    ) {
    this.thumbnails = [];
  }

  ngOnInit() {
    this.auth.getUser().subscribe(user => {
      this.user = user;
    });

    this.fetchMyThumbnails();
  }

  fetchMyThumbnails() {
    const url = `${environment.apiUrl}/thumbnails`;
    this.http
    .get<Thumbnail[]>(url)
    .pipe(map(res => {
      return res.filter(thumbnails => thumbnails.user_id == this.user._id);
    }))
    .subscribe(thumbnails => {
      this.thumbnails = thumbnails;
    });
  }

}
