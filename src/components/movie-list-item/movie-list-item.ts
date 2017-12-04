import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { PosterApi } from "../../api/poster.api";
import { Movie } from "../../models/movie";

@Component({
             selector : 'movie-list-item',
             templateUrl : 'movie-list-item.html'
           })
export class MovieListItemComponent implements OnInit {

  @Input() movie: Movie;
           image: string;

  @Output() itemClicked: EventEmitter<Movie> = new EventEmitter();

  constructor(private poster: PosterApi) {
  }

  ngOnInit() {
    this.image = this.poster.getPosterLink(this.movie.poster_path);
  }

  _itemClicked() {
    this.itemClicked.emit(this.movie);
  }

}
