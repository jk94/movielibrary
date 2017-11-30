import { NgModule } from '@angular/core';
import { MovieCardComponent } from './movie-card/movie-card';
import { CommonModule } from "@angular/common";
import { IonicModule } from "ionic-angular";

@NgModule({
            declarations : [ MovieCardComponent ],
            imports : [ CommonModule, IonicModule ],
            exports : [ MovieCardComponent ]
          })
export class ComponentsModule {}
