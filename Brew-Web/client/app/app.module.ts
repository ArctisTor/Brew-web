import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';

import {ReactiveFormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {SharedModule} from "./shared/shared.module";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HomeComponent } from './home/home.component';
import { SearchInputComponent } from './search/search-input/search-input.component';
import { BrewListComponent } from './search/brew-list/brew-list.component';
import { BrewContainerComponent } from './search/container/brew-container/brew-container.component';


import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatPaginatorModule} from "@angular/material/paginator";
import { MapComponentComponent } from './map/map-component/map-component.component';

const materialModules =[
  MatFormFieldModule,
  MatInputModule,
  ReactiveFormsModule,
  MatPaginatorModule
]

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    SearchInputComponent,
    BrewContainerComponent,
    BrewListComponent,
    MapComponentComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SharedModule,
    BrowserAnimationsModule,
    HttpClientModule,
    materialModules
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
