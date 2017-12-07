import { Component } from '@angular/core';
import { Loading, LoadingController, NavController, NavParams, ToastController } from 'ionic-angular';
import { Logger } from "../../utils/logger";
import { Movie } from "../../models/movie";
import { PosterApi } from "../../api/poster.api";
import { MovieProvider } from "../../providers/movie/movie.provider";
import { TranslateService } from "@ngx-translate/core";

@Component({
             selector : 'page-movie-detail',
             templateUrl : 'movie-detail.html',
           })
export class MovieDetailPage {

  movieItem: Movie;
  backdrop: string;
  image: string;

  loading: Loading;

  constructor(private navCtrl: NavController,
              private navParams: NavParams,
              private movie: MovieProvider,
              private poster: PosterApi,
              private toast: ToastController,
              private translate: TranslateService,
              private loadingCtrl: LoadingController) {
  }

  ionViewDidLoad() {
    Logger.log(this.navParams.data);
    this.loading = this.loadingCtrl.create({
                                             showBackdrop : true,
                                             content : this.translate.instant('SEARCH_TAB.LOADING_TEXT')
                                           });
    this.loading.present();
    this.movie.getMovie(this.navParams.get('movieID'))
        .then(movie => {
          this.movieItem = movie;
          this.backdrop  = this.poster.getBackdropLink(movie.backdrop_path);
          this.image     = this.poster.getPosterLink(movie.poster_path);
          this.loading.dismiss();
        })
        .catch((err) => {
          this.loading.dismiss();
          this.toast.create({
                              message : this.translate.instant('PAGES.MOVIE_DETAIL_PAGE.ERROR.COULD_NOT_LOAD'),
                              position : 'bottom',
                              showCloseButton : false,
                              duration : 2000
                            }).present();
          this.navCtrl.pop();
        });
  }
}
