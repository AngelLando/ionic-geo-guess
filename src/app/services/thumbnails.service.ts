import { Injectable } from '@angular/core';
import { Thumbnail } from 'src/app/models/thumbnail';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { map, tap } from 'rxjs/operators';
import { AuthService } from '../auth/auth.service';
import { User } from '../models/user';
import { Observable, BehaviorSubject } from 'rxjs';

interface ThumbnailData {
  _id: string;
  title: string;
  img: string;
  created_at: string;
  location: number;
  user_id: string;
}

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

/*   getUniqueThumbnail(id: string) {
    return this.http
      .get<ThumbnailData>(
        this.url + `/thumbnails/${id}`
      )
      .pipe(
        map(thumbnailData => {
          return new Thumbnail(
            thumbnailData._id,
            thumbnailData.title,
            thumbnailData.description,
            thumbnailData.imageUrl,
            thumbnailData.price,
            thumbnailData.userId
          );
        })
      );
  } */

}
