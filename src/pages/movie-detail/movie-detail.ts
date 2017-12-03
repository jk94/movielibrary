import { Component } from '@angular/core';
import { NavController, NavParams, ToastController } from 'ionic-angular';
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
  image: string;

  constructor(public navCtrl: NavController, public navParams: NavParams,
              public movie: MovieProvider,
              public poster: PosterApi,
              public toast: ToastController,
              public translate: TranslateService) {
  }

  ionViewDidLoad() {
    Logger.log(this.navParams.data);
    this.movie.getMovie(this.navParams.get('movieID'))
        .then(movie => {
          this.movieItem = movie;
          this.image     = this.poster.getPosterLink(movie.poster_path);
        })
        .catch((err) => {
          this.translate.get('PAGES.MOVIE_DETAIL_PAGE.ERROR.COULD_NOT_LOAD')
              .subscribe(value => {
                this.toast.create({
                                    message : value,
                                    position : 'bottom',
                                    showCloseButton : false,
                                    duration : 2000
                                  }).present();
                this.navCtrl.pop();
              });

        });
  }
}

/*

 */
