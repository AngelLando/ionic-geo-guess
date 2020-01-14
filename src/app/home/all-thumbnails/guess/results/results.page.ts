import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Thumbnail } from 'src/app/models/thumbnail';
import { ThumbnailsService } from 'src/app/services/thumbnails.service';
import { Guess } from 'src/app/models/guess';
import { GuessesService } from 'src/app/services/guesses.service';
import { NavController } from '@ionic/angular';
import * as L from 'leaflet';
import { latLng, MapOptions, marker, Marker, tileLayer, Map, LatLng } from 'leaflet';
import { defaultIcon } from 'src/app/models/marker';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-results',
  templateUrl: './results.page.html',
  styleUrls: ['./results.page.scss'],
})

export class ResultsPage implements OnInit {
  thumbnail: Thumbnail;
  guess: Guess;
  mapMarkers: Marker[];
  mapOptions: MapOptions;
  guessId: string;
  isLoading = false;
  private thumbnailSub: Subscription;

  constructor(
    private route: ActivatedRoute,
    private navCtrl: NavController,
    private thumbnailsService: ThumbnailsService,
    private guessesService: GuessesService
  ) { 
    
    {
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
      this.mapMarkers = [
        marker([ 46.778186, 6.641524 ], { icon: defaultIcon }),
        marker([ 46.780796, 6.647395 ], { icon: defaultIcon }),
        marker([ 46.784992, 6.652267 ], { icon: defaultIcon })
      ];
    }
  }

  ngOnInit() {/*
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
    });*/
  }

  onMapReady(map: Map) {
    setTimeout(() => map.invalidateSize(), 0);/*
    var popup = L.popup();

    map.on('click', (e: L.LeafletMouseEvent) => {
      console.log(e);
      popup
      .setLatLng(e.latlng)
      .setContent("You clicked the map at " + e.latlng.toString())
      .openOn(map);

      this.latitude = e.latlng.lat;
      this.longitude = e.latlng.lng;

      console.log(this.latitude);
      console.log(this.longitude);    
    });*/
  }

  public myClass = 'show';
  public iconRight = 'hide';
  public buttonIcon: string = "arrow-dropdown";

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
