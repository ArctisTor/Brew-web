import {Component, ElementRef, Input, OnInit, SimpleChanges, ViewChild} from '@angular/core';
import {Brewery} from "../../shared/models/Brewery";
import { loadModules } from 'esri-loader';

@Component({
  selector: 'app-preview-brewery',
  templateUrl: './preview-brewery.component.html',
  styleUrls: ['./preview-brewery.component.scss', './brewery-location.sass']
})
export class PreviewBreweryComponent implements OnInit {

  @Input() previewBrewery!: Brewery;

  constructor() { }

  ngOnInit(): void {
  }


  //this makes the component STATEFUL
  ngOnChanges(changes: SimpleChanges) {}

  openNewTab(){
    window.open(this.previewBrewery.website_url);
  }
}
