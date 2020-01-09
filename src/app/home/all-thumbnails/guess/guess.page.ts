import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { latLng, MapOptions, tileLayer, Map } from 'leaflet';
import { Thumbnail } from 'src/app/models/thumbnail';
import { ThumbnailsService } from 'src/app/services/thumbnails.service';
import { NavController } from '@ionic/angular';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-guess',
  templateUrl: './guess.page.html',
  styleUrls: ['./guess.page.scss'],
})

export class GuessPage implements OnInit {
  thumbnail: Thumbnail;
  guessId: string;
  isLoading = false;
  private thumbnailSub: Subscription;
  mapOptions: MapOptions;
  
  constructor(
    private route: ActivatedRoute,
    private thumbnailsService: ThumbnailsService,
    private navCtrl: NavController
  ) {

    this.mapOptions = {
      layers: [
        tileLayer(
          'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
          { maxZoom: 18 }
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
    });
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



