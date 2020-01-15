import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { WebsocketService } from './services/websocket.service';
import { Toast } from '@ionic-native/toast/ngx';


@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  constructor(
    private toast:Toast,
    private webSocket: WebsocketService,
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      this.webSocket.listen().subscribe(message => 
        this.toast.show('New Guess has been posted.', '5000', 'top').subscribe(
          toast => {
            console.log(toast);
          }
        )
      )
    });
  }
}
