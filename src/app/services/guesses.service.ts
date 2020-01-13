import { Injectable } from '@angular/core';
import { Guess } from 'src/app/models/guess';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { map, tap, take, switchMap } from 'rxjs/operators';
import { AuthService } from '../auth/auth.service';
import { User } from '../models/user';
import { Observable, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GuessesService {

  private _guesses = new BehaviorSubject<Guess[]>([]);
  private user: User;
  readonly url = `${environment.apiUrl}/guesses`;

  get guesses() {
    return this._guesses.asObservable();
  }

  constructor(public http: HttpClient, private auth: AuthService) {
  }

  fetchGuesses() {
    return this.http.get<Guess[]>(this.url);
  }

  fetchMyGuesses() {
    this.auth.getUser().subscribe(user => {
      this.user = user;
    });
    return this.http
    .get<Guess[]>(this.url)
    .pipe(map(res => {      
      return res.filter(guesses => guesses.user_id == this.user._id);
    }));
  }

  getGuess(guessId: string) {
    return this.http
    .get<Guess>(this.url + `/${guessId}`);
  }

  updateGuess(guessData) {
    return this.http.patch(this.url + `/${guessData._id}`, guessData);
  }

  postGuess(guessData){
    console.log(guessData);
    this.http.post<Guess>(this.url, guessData).subscribe(data=>{
      console.log("debug")
    });
  }

  deleteGuess(guessId: string) {    
    return this.http.delete(this.url + `/${guessId}`);
  }

}