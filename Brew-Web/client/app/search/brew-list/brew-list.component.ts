import {Component, Input, OnInit} from '@angular/core';
import {Brewery} from "../../shared/models/Brewery";

@Component({
  selector: 'app-beer-list',
  templateUrl: './brew-list.component.html',
  styleUrls: ['./beer-list.component.scss']
})
export class BrewListComponent implements OnInit {

  @Input() breweryList!: Brewery[];

  constructor() { }

  ngOnInit(): void {
  }

}
