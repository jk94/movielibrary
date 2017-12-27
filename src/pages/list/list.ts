import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { MovieListProvider } from "../../providers/movie-list/movie-list";
import { Movie } from "../../models/movie";
import { MovieDetailPage } from "../movie-detail/movie-detail";
import { PosterApi } from "../../api/poster.api";
import { MyListItem } from "../../models/my-list-item";

@Component({
             selector : 'page-list',
             templateUrl : 'list.html',
           })
export class ListPage {

  myMovieList: MyListItem[] = [];

  constructor(private navCtrl: NavController,
              private myList: MovieListProvider,
              private poster: PosterApi) {
  }

  ionViewWillEnter() {
    this.myList.getMyList()
        .then(listItems => {
          this.myMovieList = listItems;
        });
  }

  ionViewDidLoad() {
  }

  openMyListItem(movie: Movie): void {
    this.navCtrl.push(MovieDetailPage, { movieID : movie.id });
  }

  getImageForMovie(movie: Movie): string {
    let image = this.poster.getBackdropLink(movie.backdrop_path);
    if (image)
      return image;
    return this.poster.getBackdropNotFound();
  }

}
