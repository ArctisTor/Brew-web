/*
  Copyright 2019 Esri
  Licensed under the Apache License, Version 2.0 (the "License");
  you may not use this file except in compliance with the License.
  You may obtain a copy of the License at
    http://www.apache.org/licenses/LICENSE-2.0
  Unless required by applicable law or agreed to in writing, software
  distributed under the License is distributed on an "AS IS" BASIS,
  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
  See the License for the specific language governing permissions and
  limitations under the License.
*/

import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { loadModules } from 'esri-loader';

@Component({
  selector: 'app-esri-map',
  templateUrl: './esri-map.component.html',
  styleUrls: ['./esri-map.component.sass']
})

export class EsriMapComponent implements OnInit {

  @ViewChild('mapViewNode', { static: true }) private viewNode!: ElementRef; // needed to inject the MapView into the DOM
  // @ts-ignore
  mapView: __esri.MapView;
  preview = false;

  constructor() {
  }

  panMap = (coordinates: any) => {

    if (coordinates) {
     this.generateMap(this.mapView, coordinates)
       .then((response)=> {
         return new Promise((resolve, reject) => {
           this.mapView.goTo(coordinates)
             .then(() => {
               this.mapView.zoom = 18;
               this.createGraphic(this.mapView);
               setTimeout(() => {
                 resolve({true: true});
               }, 2000);
             }).catch((err: any) => {
             reject(err);
           });
         });
     })
    }
  }

  public ngOnInit() {

  }

  // @ts-ignore
  createGraphic(event){
    return loadModules([
      'esri/Graphic',
    ])
      .then(([Graphic]) => {

        let point = {
          type: 'point',
          longitude: event.center.longitude,
          latitude: event.center.latitude
        }

        let iconMarker = {
          type: 'picture-marker',
          url: './assets/images/beer-icon.jpg',
          width: '64px',
          height: '64px'
        }

        let pointGraphic = new Graphic({
          geometry: point,
          symbol: iconMarker
        })

        // pointGraphic.popupTemplate = {};

        event.graphics.add(pointGraphic);
      });
  }

  // @ts-ignore
  generateMap(view, coordinates) {
    // use esri-loader to load JSAPI modules
    return loadModules([
      'esri/layers/TileLayer',
      'esri/Map',
      'esri/views/MapView',
      'esri/widgets/LayerList',
      'esri/widgets/Expand',
      'esri/widgets/ScaleBar',
      'esri/Graphic',
    ])
      .then(([TileLayers, Map, MapView, LayerList, Expand, ScaleBar, Graphic]) => {

        let imagery = new TileLayers({
          url : 'https://services.arcgisonline.com/arcgis/rest/services/World_Imagery/MapServer',
          visible: false
        })

        let natGeo = new TileLayers({
          url: 'https://services.arcgisonline.com/arcgis/rest/services/NatGeo_World_Map/MapServer',
          visible: false
        })

        let street = new TileLayers({
          url: 'https://services.arcgisonline.com/arcgis/rest/services/World_Street_Map/MapServer',
          visible: false
        })

        // @ts-ignore
        const map: __esri.Map = new Map({
          basemap: 'satellite',
          layers: [imagery, natGeo, street],
        });


        // @ts-ignore
        this.mapView = new MapView({
          container: this.viewNode.nativeElement,
          center: coordinates,
          zoom: 12,
          map
        });



        let layerList = new LayerList({
          container: document.createElement("div"),
          view: this.mapView
        });


        let layerListExpand = new Expand({
          view: this.mapView,
          content:layerList.domNode,
          expandIconClass: "esri-icon-basemap",
          group: "bottom-right",
          mode: "floating"
        });

        this.mapView.ui.add(layerListExpand, 'top-right');

        const scaleBar = new ScaleBar({
          view: this.mapView,
          unit: 'dual'
        })

        this.mapView.ui.add(scaleBar, 'bottom-left')


      })
      .catch(err => {
        console.log(err);
      });
  }
}
