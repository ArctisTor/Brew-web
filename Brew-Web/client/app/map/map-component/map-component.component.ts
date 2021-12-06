import { Component, OnInit } from '@angular/core';
import {Loader} from "@googlemaps/js-api-loader";
import {Position} from "@angular/compiler";

@Component({
  selector: 'app-map-component',
  templateUrl: './map-component.component.html',
  styleUrls: ['./map-component.component.scss']
})
export class MapComponentComponent implements OnInit {

  latitude!: number;
  longitude!: number;
  zoom!: number;
  address!: string;

  constructor() {
  }

  ngOnInit(): void {

    this.setCurrentLocation();

    let loader = new Loader({
      apiKey: "AIzaSyCNyNu3eZVRUk7bU27q8vxrS2in-XQ9__E",
      version: "weekly"
    })

    loader.load().then(() => {
      new google.maps.Map(document.getElementById("map") as HTMLElement, {
        center: {lat: this.latitude, lng: this.longitude},
        zoom: 8,
      });
    });
  }


  private setCurrentLocation() {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.latitude = position.coords.latitude;
        this.longitude = position.coords.longitude;
      });
    }
  }
}
