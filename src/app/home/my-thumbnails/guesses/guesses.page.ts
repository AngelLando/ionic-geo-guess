import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-guesses',
  templateUrl: './guesses.page.html',
  styleUrls: ['./guesses.page.scss'],
})
export class GuessesPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  doRefresh(ev: any) {
    this.ngOnInit();

    setTimeout(() => {
      ev.target.complete();
    }, 500);
  }

}
