import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './home/home.component';
import {BrewContainerComponent} from "./search/container/brew-container/brew-container.component";
import {MapComponentComponent} from "./map/map-component/map-component.component";

const routes: Routes = [
  { path: '', component: MapComponentComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
