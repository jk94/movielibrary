import { Component, Input, OnInit } from '@angular/core';
import { Movie } from "../../models/movie";
import { PosterApi } from "../../api/poster.api";

@Component({
             selector : 'movie-card',
             templateUrl : 'movie-card.html'
           })
export class MovieCardComponent implements OnInit {
  @Input() item: Movie;
           image: string;

  constructor(private poster: PosterApi) {

  }

  ngOnInit(): void {
    this.image = this.poster.getPosterLink(this.item.poster_path);
  }

}
