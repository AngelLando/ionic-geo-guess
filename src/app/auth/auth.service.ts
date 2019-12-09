import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, ReplaySubject } from 'rxjs';
import { map } from 'rxjs/operators';

import { AuthResponse } from '../models/auth-response';
import { User } from '../models/user';
import { AuthRequest } from '../models/auth-request';

/**
 * Authentication service for login/logout.
 */
@Injectable({ providedIn: 'root' })
export class AuthService {

  private auth$: Observable<AuthResponse>;
  private authSource: ReplaySubject<AuthResponse>;

  constructor(private http: HttpClient) {
    this.authSource = new ReplaySubject(1);
    this.authSource.next(undefined);
    this.auth$ = this.authSource.asObservable();
  }

  isAuthenticated(): Observable<boolean> {
    return this.auth$.pipe(map(auth => Boolean(auth)));
  }

  getUser(): Observable<User> {
    return this.auth$.pipe(map(auth => auth ? auth.user : undefined));
  }

  getToken(): Observable<string> {
    return this.auth$.pipe(map(auth => auth ? auth.token : undefined));
  }

  logIn(authRequest: AuthRequest): Observable<User> {

    const authUrl = 'https://comem-archioweb-2019-2020-g.herokuapp.com/users/login';
    return this.http.post<AuthResponse>(authUrl, authRequest).pipe(
      map(auth => {
        this.authSource.next(auth);
        console.log(`User ${auth.user.username} logged in`);
        return auth.user;
      })
    );
  }

  logOut() {
    this.authSource.next(null);
    console.log('User logged out');
  }

}