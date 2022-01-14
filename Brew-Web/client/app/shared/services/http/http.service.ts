import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {catchError, retry, throwError} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  openBreweryURL = 'https://api.openbrewerydb.org/breweries/';
  brewWebURL = '/brew'
  findAddress = 'https://geocode.arcgis.com/arcgis/rest/services/World/GeocodeServer/findAddressCandidates'

  headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'X-Requested-With': 'XMLHttpRequest',
      'Access-Control-Allow-Origin': '*'
    }
  )

  constructor(private http: HttpClient) { }

  getBeer() {
    return this.http.get(this.openBreweryURL);
  }

  queryBrewery(params: any) {
    return this.http.request('GET', this.brewWebURL+'/brew/query',
      {headers: this.headers, responseType: 'json', params})
      .pipe(retry(0), catchError(this.handleError));
  }

  findAddressCandidates(params: any){
    return this.http.request('Get', this.findAddress, {params})
      .pipe(retry(0), catchError(this.handleError));
  }

  handleError(error: any) {

    let errorMessage = '';

    if (error.error instanceof ErrorEvent) {
      // client-side error
      errorMessage = `Error: ${error.error.message}`;
    } else {

      // server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(errorMessage);
  }
}
