import { NgModule } from '@angular/core';
import { MovieCardComponent } from './movie-card/movie-card';
import { CommonModule } from "@angular/common";
import { IonicModule } from "ionic-angular";
import { MovieCardDiscoverComponent } from "./movie-card-discover/movie-card-discover";
import { MovieResultItemComponent } from './movie-result-item/movie-result-item';

@NgModule({
            declarations : [
              MovieCardComponent,
              MovieCardDiscoverComponent,
              MovieResultItemComponent ],
            imports : [ CommonModule, IonicModule ],
            exports : [
              MovieCardComponent,
              MovieCardDiscoverComponent,
              MovieResultItemComponent ]
          })
export class ComponentsModule {}
