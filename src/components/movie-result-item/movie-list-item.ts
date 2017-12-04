import { Component, Input, OnInit } from '@angular/core';
import { PosterApi } from "../../api/poster.api";
import { Movie } from "../../models/movie";

@Component({
             selector : 'movie-list-item',
             templateUrl : 'movie-list-item.html'
           })
export class MovieListItemComponent implements OnInit {

  @Input() movie: Movie;
           image: string;

  constructor(private poster: PosterApi) {
  }

  ngOnInit() {
    this.image = this.poster.getPosterLink(this.movie.poster_path);
  }

}
