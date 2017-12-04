import { NgModule } from '@angular/core';
import { MovieCardComponent } from './movie-card/movie-card';
import { CommonModule } from "@angular/common";
import { IonicModule } from "ionic-angular";
import { MovieCardDiscoverComponent } from "./movie-card-discover/movie-card-discover";
import { MovieListItemComponent } from "./movie-list-item/movie-list-item";

@NgModule({
            declarations : [
              MovieCardComponent,
              MovieCardDiscoverComponent,
              MovieListItemComponent ],
            imports : [ CommonModule, IonicModule ],
            exports : [
              MovieCardComponent,
              MovieCardDiscoverComponent,
              MovieListItemComponent ]
          })
export class ComponentsModule {}
