import { Injectable } from '@angular/core';
import { Thumbnail } from 'src/app/models/thumbnail';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { map, tap, take, switchMap } from 'rxjs/operators';
import { AuthService } from '../auth/auth.service';
import { User } from '../models/user';
import { Observable, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ThumbnailsService {

  private _thumbnails = new BehaviorSubject<Thumbnail[]>([]);
  private user: User;
  readonly url = `${environment.apiUrl}/thumbnails`;

  get thumbnails() {
    return this._thumbnails.asObservable();
  }

  constructor(public http: HttpClient, private auth: AuthService) {
  }

  fetchThumbnails() {
    return this.http.get<Thumbnail[]>(this.url);
  }

  fetchMyThumbnails() {
    this.auth.getUser().subscribe(user => {
      this.user = user;
    });
    return this.http
    .get<Thumbnail[]>(this.url)
    .pipe(map(res => {      
      return res.filter(thumbnails => thumbnails.user_id == this.user._id);
    }));
  }

  getThumbnail(thumbnailId: string) {
    return this.http
    .get<Thumbnail>(this.url + `/${thumbnailId}`);
  }

  updateThumbnail(thumbnailData) {
    return this.http.patch(this.url + `/${thumbnailData._id}`, thumbnailData);
  }

  postThumbnail(thumbnailData){
    console.log(thumbnailData);
    this.http.post<Thumbnail>(this.url, thumbnailData).subscribe(data=>{
      console.log("debug")
    });
  }

}