import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Thumbnail } from 'src/app/models/thumbnail';
import { ThumbnailsService } from 'src/app/services/thumbnails.service';
import { Guess } from 'src/app/models/guess';
import { GuessesService } from 'src/app/services/guesses.service';
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
  distance: number;
  thumbnail: Thumbnail;
  thumbnailId: string;
  guess: Guess;
  guessId: string;
  mapMarkers: Marker[];
  mapOptions: MapOptions;
  isLoading = false;
  private guessSub: Subscription;
  private thumbnailSub: Subscription;

  constructor(
    private route: ActivatedRoute,
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
    }
  }

  ngOnInit() {
    this.route.queryParams
    .subscribe(params => {
      this.distance = Math.round(params.distance*100)/100;
    });

    this.route.paramMap.subscribe(paramMap => {
      this.guessId = paramMap.get('guessId');
      this.thumbnailId = paramMap.get('thumbnailId');
      this.isLoading = true;
      this.guessSub = this.guessesService
      .getGuess(this.guessId)
      .subscribe(
        guess => {
          this.guess = guess;
          this.isLoading = false;
        }
      );
      this.thumbnailSub = this.thumbnailsService
      .getThumbnail(this.thumbnailId)
      .subscribe(
        thumbnail => {
          this.thumbnail = thumbnail;
          this.isLoading = false;
          this.mapOptions.center = [this.thumbnail.location.coordinates[1], this.thumbnail.location.coordinates[0]];
          this.addMarker();
        }
      )
    });
  }
  
  addMarker() {
    this.mapMarkers = [
      marker([this.thumbnail.location.coordinates[1], this.thumbnail.location.coordinates[0]], { icon: defaultIcon }).bindTooltip('The picture was taken here.'),
    ];
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