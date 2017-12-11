import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { MovieListProvider } from "../../providers/movie-list/movie-list";
import { Movie } from "../../models/movie";
import { Logger } from "../../utils/logger";
import { MovieDetailPage } from "../movie-detail/movie-detail";

@Component({
             selector : 'page-list',
             templateUrl : 'list.html',
           })
export class ListPage {

  movieList: Movie[] = [];

  constructor(private navCtrl: NavController,
              private navParams: NavParams,
              private myList: MovieListProvider) {
  }

  ionViewWillEnter() {
    Logger.log('List enter');
    this.movieList = this.myList.getMyList();
  }

  ionViewDidLoad() {
  }

  openMyListItem(item) {
    this.navCtrl.push(MovieDetailPage, { movieID : item.id });
  }

}
