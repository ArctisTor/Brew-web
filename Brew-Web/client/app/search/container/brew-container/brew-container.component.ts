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

  // @ts-ignore
  private geoCoder: google.maps.Geocoder;

  constructor(
    private http: HttpService,
    private toaster: ToastrService
  ) { }

  ngOnInit(): void {
    // @ts-ignore
    this.geoCoder = new google.maps.Geocoder();
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
    if (!previewBrewery.longitude || !previewBrewery.latitude) {
      this.toaster.error("There are no coordinates found for: " + previewBrewery.name);
      return Promise.reject("There are no coordinates found for: " + previewBrewery.name)
    }
    try {
      let coordinates = [parseFloat(previewBrewery.longitude), parseFloat(previewBrewery.latitude)];
      await this.map.panMap(coordinates);

      this.geoCoder.geocode({'address': previewBrewery.street},  (results: any, status: string) => {
        if (status == 'OK'){}
      });


    } catch (err) {
      console.log(err);
    }
  }
}
