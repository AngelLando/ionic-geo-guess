import { Component, OnInit } from '@angular/core';
import { latLng, MapOptions, tileLayer, Map } from 'leaflet';
import { Thumbnail } from 'src/app/models/thumbnail';

@Component({
  selector: 'app-guess',
  templateUrl: './guess.page.html',
  styleUrls: ['./guess.page.scss'],
})

export class GuessPage implements OnInit {

  mapOptions: MapOptions;
  constructor() {

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
  }

  onMapReady(map: Map) {
    setTimeout(() => map.invalidateSize(), 0);
  }

}



