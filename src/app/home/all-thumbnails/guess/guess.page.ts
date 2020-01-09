import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { latLng, MapOptions, tileLayer, Map } from 'leaflet';
import { Thumbnail } from 'src/app/models/thumbnail';
import { ThumbnailsService } from 'src/app/services/thumbnails.service';
import { NavController } from '@ionic/angular';
import { Subscription } from 'rxjs';
/*import { Geoposition } from '@ionic-native/geolocation/ngx';
import { Geolocation } from '@ionic-native/geolocation/ngx';*/

@Component({
  selector: 'app-guess',
  templateUrl: './guess.page.html',
  styleUrls: ['./guess.page.scss'],
})

export class GuessPage implements OnInit {
  thumbnail: Thumbnail;
  guessId: string;
  /*coords:Coordinates;*/
  isLoading = false;
  private thumbnailSub: Subscription;
  mapOptions: MapOptions;
  
  constructor(
    private route: ActivatedRoute,
    private thumbnailsService: ThumbnailsService,
    private navCtrl: NavController,
    /*private geolocation: Geolocation */
    ) {

    this.mapOptions = {
      layers: [
        tileLayer(
          'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
          { maxZoom: 3 }
        )
      ],
      zoom: 13,
      center: latLng(46.778186, 6.641524)
    };
  }

  ngOnInit() {
    this.route.paramMap.subscribe(paramMap => {
      if(!paramMap.has('guessId')) {
        this.navCtrl.navigateBack('/home/all-thumbnails');
        return;
      }
      this.guessId = paramMap.get('guessId');
      this.isLoading = true;
      this.thumbnailSub = this.thumbnailsService
      .getThumbnail(paramMap.get('guessId'))
      .subscribe(
        thumbnail => {
          this.thumbnail = thumbnail;
          this.isLoading = false;
        }
      )
    });/*
    this.geolocation.getCurrentPosition().then((position: Geoposition) => {
      this.coords = position.coords;
     console.log(`User is at ${this.coords.longitude}, ${this.coords.latitude}`);
   }).catch(err => {
     console.warn(`Could not retrieve user position because: ${err.message}`);
   });*/
  }

  onMapReady(map: Map) {
    setTimeout(() => map.invalidateSize(), 0);
  }

  public myClass = 'show';
  public iconRight = 'hide';
  public buttonIcon: string = "arrow-dropdown";

  toggleClass(getIcon: string){
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



