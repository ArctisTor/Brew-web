import { Component, OnInit } from '@angular/core';
import {HttpService} from "../../../shared/services/http/http.service";
import {Brewery} from "../../../shared/models/Brewery";

@Component({
  selector: 'app-brew-container',
  templateUrl: './brew-container.component.html',
  styleUrls: ['./brew-container.component.scss']
})
export class BrewContainerComponent implements OnInit {

  isQuery = false;
  breweryList: Brewery[] = [];

  constructor(private http: HttpService) { }

  ngOnInit(): void {
  }

  queryBreweries(queryString: string) {
    this.isQuery = true;
    console.log(queryString);
  }
}
