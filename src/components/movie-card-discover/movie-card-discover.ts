import { Component, Input, OnInit } from '@angular/core';
import { Movie } from "../../models/movie";
import { PosterApi } from "../../api/poster.api";
import { NavController } from "ionic-angular";
import { MovieDetailPage } from "../../pages/movie-detail/movie-detail";
import { MovieListProvider } from "../../providers/movie-list/movie-list";

@Component({
             selector : 'movie-card-discover',
             templateUrl : 'movie-card-discover.html'
           })
export class MovieCardDiscoverComponent implements OnInit {
  @Input() item: Movie;
           image: string;
           inList: Promise<boolean>;

  constructor(private poster: PosterApi,
              private navCtrl: NavController,
              private myList: MovieListProvider) { }

  ngOnInit(): void {
    this.image  = this.poster.getPosterLink(this.item.poster_path);
    this.inList = this.myList.isInMyList(this.item)
  }

  goToDetail() {
    this.navCtrl.push(MovieDetailPage, { movieID : this.item.id });
  }
}
