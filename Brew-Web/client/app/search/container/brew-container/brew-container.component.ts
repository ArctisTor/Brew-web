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
    var request = {
      query: queryString
    };
    this.http.queryBrewery(request).subscribe((result: any)=> {
      this.breweryList = result.breweryList;
      // console.log(this.breweryList);
    })
  }
}
