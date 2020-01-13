import { Injectable } from '@angular/core';
import { User } from '../models/user';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  readonly url = `${environment.apiUrl}/users`;

  constructor(public http: HttpClient, private auth: AuthService) { }

  fetchUsers() {
    return this.http.get<User[]>(this.url);
  }

  getUser(userId: string) {
    return this.http.get<User>(this.url + `/${userId}`);
  }
}
