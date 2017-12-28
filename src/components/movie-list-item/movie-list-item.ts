import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { PosterApi } from "../../api/poster.api";
import { Movie } from "../../models/movie";
import { MovieListProvider } from "../../providers/movie-list/movie-list";

@Component({
             selector : 'movie-list-item',
             templateUrl : 'movie-list-item.html'
           })
export class MovieListItemComponent implements OnInit {

  @Input() movie: Movie;
           image: string;
           inList: Promise<boolean>;

  @Output() itemClicked: EventEmitter<Movie> = new EventEmitter();

  constructor(private poster: PosterApi,
              private myList: MovieListProvider) {
  }

  ngOnInit() {
    this.image  = this.poster.getPosterLink(this.movie.poster_path);
    this.image  = this.image ? this.image : this.poster.getPosterNotFound();
    this.inList = this.myList.isInMyList(this.movie)
  }

  _itemClicked() {
    this.itemClicked.emit(this.movie);
  }

}
