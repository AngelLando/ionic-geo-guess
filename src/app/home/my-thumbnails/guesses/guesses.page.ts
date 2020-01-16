import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Thumbnail } from 'src/app/models/thumbnail';
import { ThumbnailsService } from 'src/app/services/thumbnails.service';
import { Guess } from 'src/app/models/guess';
import { GuessesService } from 'src/app/services/guesses.service';
import * as L from 'leaflet';
import { latLng, MapOptions, marker, Marker, tileLayer, Map, LatLng } from 'leaflet';
import { defaultIcon } from 'src/app/models/marker';
import { redIcon } from 'src/app/models/marker';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-guesses',
  templateUrl: './guesses.page.html',
  styleUrls: ['./guesses.page.scss'],
})
export class GuessesPage implements OnInit {

  thumbnail: Thumbnail;
  thumbnailId: string;
  filteredGuesses: Guess[];
  guesses: Guess[];
  mapMarkers: Marker[];
  mapOptions: MapOptions;
  isLoading = false;
  private thumbnailSub: Subscription;
  contentLoaded = false;

  constructor(
    private route: ActivatedRoute,
    private thumbnailsService: ThumbnailsService,
    private guessesService: GuessesService,
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
    this.mapMarkers = [];
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
          this.mapOptions.center = [this.thumbnail.location.coordinates[1], this.thumbnail.location.coordinates[0]];
          this.addMarker();
          console.log(this.mapMarkers);
        }
      )
    });
    console.log(this.thumbnailId)
    this.guessesService.fetchGuesses().subscribe(guesses => {
      this.guesses = guesses;
      this.contentLoaded = true;
      this.guesses.forEach(guess => {
        this.thumbnailsService.getThumbnail(this.thumbnailId).subscribe(res => {
          guess.geolocation = res.location;
        });
      })

      this.filteredGuesses = guesses.filter(guesses => guesses.thumbnail_id == this.thumbnailId);

      this.filteredGuesses.forEach((guess) =>{

        this.mapMarkers.push(
          marker([guess.location.coordinates[1], guess.location.coordinates[0]], { icon: defaultIcon }),
        )
      });
    });    
  }

  addMarker() {
    this.mapMarkers = [
      marker([this.thumbnail.location.coordinates[1], this.thumbnail.location.coordinates[0]], { icon: redIcon }).bindTooltip('You took the picture here.'),
    ];
  }

  doRefresh(ev: any) {
    this.ngOnInit();

    setTimeout(() => {
      ev.target.complete();
    }, 500);
  }

}
