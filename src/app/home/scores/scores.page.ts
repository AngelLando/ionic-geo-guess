import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-scores',
  templateUrl: './scores.page.html',
  styleUrls: ['./scores.page.scss'],
})

export class ScoresPage implements OnInit {

  constructor(private http: HttpClient) { }

  ngOnInit() {
    const url = `${environment.apiUrl}/users`;
    this.http.get(url).subscribe(users => {
      console.log(`Users loaded`, users);
    });
  }

}
