import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Movie } from "../../models/movie";

/**
 * Generated class for the MovieBackdropCardComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
             selector : 'movie-backdrop-card',
             templateUrl : 'movie-backdrop-card.html'
           })
export class MovieBackdropCardComponent {

  @Input() image: string;
  @Input() movie: Movie;

  @Output() itemClicked: EventEmitter<Movie> = new EventEmitter();

  constructor() {
  }

  cardClicked() {
    this.itemClicked.emit(this.movie)
  }

}
