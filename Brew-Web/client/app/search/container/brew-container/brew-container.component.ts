import {Component, OnInit, ViewChild} from '@angular/core';
import {HttpService} from "../../../shared/services/http/http.service";
import {Brewery} from "../../../shared/models/Brewery";
import {ToastrService} from "ngx-toastr";
import {PreviewBreweryComponent} from "../../preview-brewery/preview-brewery.component";
import {EsriMapComponent} from "../../../map/esri-map/esri-map.component";

@Component({
  selector: 'app-brew-container',
  templateUrl: './brew-container.component.html',
  styleUrls: ['./brew-container.component.scss', 'brewery-map.sass']
})
export class BrewContainerComponent implements OnInit {

  isQuery = false;
  breweryList: Brewery[] = [];
  selectedBrewery!: Brewery;
  @ViewChild(PreviewBreweryComponent, {static: true}) preview!: PreviewBreweryComponent;
  @ViewChild(EsriMapComponent, { static: true }) map!: EsriMapComponent; // needed to reference the child map component


  constructor(
    private http: HttpService,
    private toaster: ToastrService
  ) { }

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

  async previewBrewery(previewBrewery: Brewery): Promise<void> {
    this.selectedBrewery = previewBrewery;
    let coordinates: any[];
    if (!previewBrewery.longitude || !previewBrewery.latitude) {

      let request = {
        SingleLine: previewBrewery.street + ', ' + previewBrewery.city + ', ' + previewBrewery.state + ', ' + previewBrewery.postal_code,
        outFields: '*',
        forStorage: 'false',
        f: 'pjson'
      };

      this.http.findAddressCandidates(request)
        .subscribe({
          next: (response: any)=>{
            if(response && response.candidates){
              let location = response.candidates[0].location;
              coordinates = [location.x, location.y];
            }
          },
          error: err => {
            this.toaster.error(err);
            this.toaster.error("There are no coordinates found for: " + previewBrewery.name);
            return Promise.reject("There are no coordinates found for: " + previewBrewery.name)
          },
          complete: () => {
            try {
              this.map.panMap(coordinates);
            } catch (err) {
              console.log(err);
            }
          }
        })
    } else {
      coordinates = [parseFloat(previewBrewery.longitude), parseFloat(previewBrewery.latitude)];
      try {
        await this.map.panMap(coordinates);
      } catch (err) {
        console.log(err);
      }
    }

  }
}
