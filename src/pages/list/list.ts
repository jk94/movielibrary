import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { MovieListProvider } from "../../providers/movie-list/movie-list";
import { Movie } from "../../models/movie";
import { Logger } from "../../utils/logger";
import { MovieDetailPage } from "../movie-detail/movie-detail";
import { PosterApi } from "../../api/poster.api";

@Component({
             selector : 'page-list',
             templateUrl : 'list.html',
           })
export class ListPage {

  movieList: Movie[] = [];

  constructor(private navCtrl: NavController,
              private myList: MovieListProvider,
              private poster: PosterApi) {
  }

  ionViewWillEnter() {
    Logger.log('List enter');
    this.myList.getMyList()
        .then(movies => {
          this.movieList = movies;
        });
  }

  ionViewDidLoad() {
  }

  openMyListItem(item) {
    this.navCtrl.push(MovieDetailPage, { movieID : item.id });
  }

  getImageForMovie(movie: Movie): string {
    let image = this.poster.getBackdropLink(movie.backdrop_path);
    if (image)
      return image;
    return this.poster.getBackdropNotFound();
  }

}
