import { Component } from '@angular/core';

export interface HomePageTab {
  title: string;
  icon: string;
  path: string;
}

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  tabs: HomePageTab[];

  constructor() {
    this.tabs = [
      { title: 'Home', icon: 'home', path: 'all-thumbnails' },
      { title: 'Scores', icon: 'trophy', path: 'scores'},
      { title: 'test add', icon: 'list', path: 'create-thumbnail'},
      { title: 'My thumbnails', icon: 'list', path: 'my-thumbnails'},
      { title: 'Settings', icon: 'settings', path: 'settings'},
    ];
  }

}