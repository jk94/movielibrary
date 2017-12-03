import { Component, Input, OnInit } from '@angular/core';
import { PosterApi } from "../../api/poster.api";
import { Movie } from "../../models/movie";

/**
 * Generated class for the MovieResultItemComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
             selector : 'movie-result-item',
             templateUrl : 'movie-result-item.html'
           })
export class MovieResultItemComponent implements OnInit {

  @Input() movie: Movie;
           image: string;

  constructor(private poster: PosterApi) {
  }

  ngOnInit() {
    this.image = this.poster.getPosterLink(this.movie.poster_path);
  }

}
