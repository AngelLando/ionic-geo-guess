import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import * as L from 'leaflet';
import { AlertController } from '@ionic/angular';
import { latLng, MapOptions, tileLayer, Map } from 'leaflet';
import { Thumbnail } from 'src/app/models/thumbnail';
import { ThumbnailsService } from 'src/app/services/thumbnails.service';
import { GuessesService } from 'src/app/services/guesses.service';
import { NavController } from '@ionic/angular';
import { User } from 'src/app/models/user';
import { Subscription } from 'rxjs';
import { AuthService } from '../../../auth/auth.service';

@Component({
  selector: 'app-guess',
  templateUrl: './guess.page.html',
  styleUrls: ['./guess.page.scss'],
})

export class GuessPage implements OnInit {
  thumbnail: Thumbnail;
  thumbnailId: string;
  latitude: number;
  longitude: number;
  user: User;
  distance: number;
  isLoading = false;
  posted=false;
  private thumbnailSub: Subscription;
  mapOptions: MapOptions;
  
  constructor(
    public alertController: AlertController,
    private auth: AuthService,
    private route: ActivatedRoute,
    private guessesService:GuessesService,
    private thumbnailsService: ThumbnailsService,
    private navCtrl: NavController,
    private router: Router
    ) {
    this.mapOptions = {
      layers: [
        tileLayer(
          'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
          { maxZoom: 30 }
        )
      ],
      zoom: 13,
      center: latLng(46.778186, 6.641524)
    };
  }

  ngOnInit() {
    this.route.paramMap.subscribe(paramMap => {
      this.thumbnailId = paramMap.get('thumbnailId');
      this.isLoading = true;
      this.thumbnailSub = this.thumbnailsService
      .getThumbnail(this.thumbnailId)
      .subscribe(
        thumbnail => {
          this.thumbnail = thumbnail;
          this.isLoading = false;
        }
      )
    });
  }

  onMapReady(map: Map) {
    setTimeout(() => map.invalidateSize(), 0);
    var popup = L.popup();

    map.on('click', (e: L.LeafletMouseEvent) => {
      popup
      .setLatLng(e.latlng)
      .setContent("You clicked the map at " + e.latlng.toString())
      .openOn(map);

      this.latitude = e.latlng.lat;
      this.longitude = e.latlng.lng;   
    });
  }


  onValidate() {
  //get values
    this.auth.getUser().subscribe(user => {
      this.user = user;
    });

    // calculates the distance between the two points (the one of the guess and the one of the thumbnail), in KM
    var lat1 = this.latitude;
    var lon1 = this.longitude;
    var lat2 = this.thumbnail.location.coordinates[1];
    var lon2 = this.thumbnail.location.coordinates[0];
    this.distance = 0;

    if ((lat1 !== lat2) && (lon1 !== lon2)) {
      var radlat1 = Math.PI * lat1/180;
      var radlat2 = Math.PI * lat2/180;
      var theta = lon1-lon2;
      var radtheta = Math.PI * theta/180;
      var dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
      if (dist > 1) {
        dist = 1;
      }
      dist = Math.acos(dist);
      dist = dist * 180/Math.PI;
      dist = dist * 60 * 1.1515;
      this.distance = dist * 1.609344;
    }
    var score = 0;

    if(this.distance < 10 ) {
      score = 100;
    } else if (this.distance < 100) {
      score = 60;
    } else if (this.distance < 1000) {
      score = 10;
    };

    const data = {
      "thumbnail_id": this.thumbnail._id,
      "user_id": this.user._id,
      "score": score,
      "location": {"type": "Point", "coordinates": [this.longitude, this.latitude ]}
    }

    this.guessesService.fetchGuesses().subscribe(guesses =>{
      guesses.forEach(guess => {
        if (guess.user_id == this.user._id && guess.thumbnail_id == this.thumbnail._id){
       this.posted=true;
        } 
      });
      if (this.posted==false){
        this.guessesService.postGuess(data).subscribe({
          next: (guess) => {
              this.router.navigate(['home', 'all-thumbnails', 'guess', this.thumbnail._id, 'results', guess._id], { queryParams: {distance:this.distance}})
          },
          error: err => {   
           this.presentAlert('You cannot guess your own thumbnail.');
            console.warn(`Posted Thumbnail failed: ${err.message}`);
          }
          })
      }else{
        this.presentAlert('You already tried to guess this thumbnail');
      }
          })
      


  }


  public myClass = 'show';
  public iconRight = 'hide';
  public buttonIcon: string = "arrow-dropdown";
  public availableIcon = "";

  setButton() {
    this.availableIcon = "checkmark";
  }
   presentAlert(message) {
    const alert = document.createElement('ion-alert');
    alert.header = 'Alert';
    alert.message = message;
    alert.buttons = ['OK'];
  
    document.body.appendChild(alert);
    return alert.present();
  }

  toggleClass(){
    if (this.myClass=="show") {
      this.myClass='hide';
    } else {
      this.myClass='show';
    };
    if (this.iconRight=="hide") {
      this.iconRight='show';
    } else {
      this.iconRight='hide';
    };
    if (this.buttonIcon === 'arrow-dropright') {
      this.buttonIcon = "arrow-dropdown";
    }
    else if (this.buttonIcon === 'arrow-dropdown') {
      this.buttonIcon = "arrow-dropright";
    }
  }
}



