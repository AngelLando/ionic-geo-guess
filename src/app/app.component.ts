import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { WebsocketService } from './services/websocket.service';
import { Toast } from '@ionic-native/toast/ngx';
import { User } from 'src/app/models/user';
import { UsersService } from 'src/app/services/users.service';
import { AuthService } from 'src/app/auth/auth.service';
import { Thumbnail } from 'src/app/models/thumbnail';
import { ThumbnailsService } from 'src/app/services/thumbnails.service';


@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  users: User[];
  private user: User;
  private thumbnail: Thumbnail;


  constructor(
    private thumbnailsService: ThumbnailsService,
    private toast:Toast,
    private UsersService: UsersService,
    private webSocket: WebsocketService,
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private usersService: UsersService,
    private auth: AuthService,


  ) {
    this.initializeApp();
  }

  initializeApp() {

    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      this.auth.getUser().subscribe(user => {
        this.user = user;
      });
      this.webSocket.listen().subscribe(message => { 
  this.thumbnailsService.getThumbnail(message.thumbnail_id).subscribe(thumbnail=>{
         this.thumbnail=thumbnail
       });
      
        this.UsersService.getUser(message.user_id).subscribe( user=>{
            const message="New Guess has been posted by "+user.username+" on your thumbnail "+this.thumbnail.title+" .";
            if(this.thumbnail.user_id==this.user._id){
              this.toast.show(message, '6000', 'top').subscribe(
            toast => {
              console.log(toast);
            }
          )
            }
     
          }
        )   
        }
      )
    });
  }


}
