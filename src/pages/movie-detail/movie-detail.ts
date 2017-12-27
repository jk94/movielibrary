import { Component } from '@angular/core';
import { Loading, LoadingController, NavController, NavParams, ToastController } from 'ionic-angular';
import { Logger } from "../../utils/logger";
import { Movie } from "../../models/movie";
import { PosterApi } from "../../api/poster.api";
import { MovieProvider } from "../../providers/movie/movie.provider";
import { TranslateService } from "@ngx-translate/core";
import { MovieListProvider } from "../../providers/movie-list/movie-list";
import { YoutubeVideoPlayer } from "@ionic-native/youtube-video-player";

@Component({
             selector : 'page-movie-detail',
             templateUrl : 'movie-detail.html',
           })
export class MovieDetailPage {

  movieItem: Movie;
  backdrop: string;
  image: string;
  inMyList: boolean = false;

  loading: Loading;

  constructor(private navCtrl: NavController,
              private navParams: NavParams,
              private movie: MovieProvider,
              private poster: PosterApi,
              private toast: ToastController,
              private translate: TranslateService,
              private loadingCtrl: LoadingController,
              private myList: MovieListProvider,
              private youtube: YoutubeVideoPlayer) {
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
          this.backdrop  = this.backdrop ? this.backdrop : this.poster.getBackdropNotFound();
          this.image     = this.poster.getPosterLink(movie.poster_path);
          this.image     = this.image ? this.image : this.poster.getPosterNotFound();
          this.myList.isInMyList(movie).then(inList => this.inMyList = inList);
          this.movieItem.overview = this.movieItem.overview.length > 0 ? this.movieItem.overview : this.translate.instant('PAGES.MOVIE_DETAIL_PAGE.NO_OVERVIEW');
          this.loading.dismiss();
        })
        .catch((err) => {
          Logger.error(err);
          this.loading.dismiss();
          this.toast.create({
                              message : this.translate.instant('PAGES.MOVIE_DETAIL_PAGE.MESSAGE.COULD_NOT_LOAD'),
                              position : 'bottom',
                              showCloseButton : false,
                              duration : 2000
                            }).present();
          this.navCtrl.pop();
        });
  }

  public toggleMyList(): void {
    this.myList.isInMyList(this.movieItem)
        .then(result => {
          console.log(result);
          if (result)
            this.removeFromMyList();
          else
            this.addToMyList();
        });
  }

  public openVideo(key: string): void {
    this.youtube.openVideo(key);
  }

  private addToMyList(): void {
    this.loading = this.loadingCtrl.create({
                                             showBackdrop : true,
                                             content : this.translate.instant('PAGES.MOVIE_DETAIL_PAGE.MESSAGE.ADD_TO_MY_LIST_IN_PROGRESS'),
                                             enableBackdropDismiss : false,
                                           }
    );
    this.myList.addToMyList(this.movieItem)
        .then(() => {
          this.inMyList = true;
          this.loading.dismiss();
          this.toast.create({
                              message : this.translate.instant('PAGES.MOVIE_DETAIL_PAGE.MESSAGE.ADD_TO_MY_LIST_SUCCESSFUL'),
                              position : 'bottom',
                              showCloseButton : false,
                              duration : 2000
                            }).present();
        })
        .catch(() => {
          this.loading.dismiss();
          this.toast.create({
                              message : this.translate.instant('PAGES.MOVIE_DETAIL_PAGE.MESSAGE.ADD_TO_MY_LIST_FAILED'),
                              position : 'bottom',
                              showCloseButton : false,
                              duration : 2000
                            }).present();
        });
  }

  private removeFromMyList(): void {
    this.loading = this.loadingCtrl.create({
                                             showBackdrop : true,
                                             content : this.translate.instant('PAGES.MOVIE_DETAIL_PAGE.MESSAGE.REMOVE_FROM_MY_LIST_IN_PROGRESS'),
                                             enableBackdropDismiss : false,
                                           }
    );
    this.myList.removeFromMyList(this.movieItem)
        .then(() => {
          this.inMyList = false;
          this.loading.dismiss();
          this.toast.create({
                              message : this.translate.instant('PAGES.MOVIE_DETAIL_PAGE.MESSAGE.REMOVE_FROM_MY_LIST_SUCCESSFUL'),
                              position : 'bottom',
                              showCloseButton : false,
                              duration : 2000
                            }).present();
        })
        .catch(() => {
          this.loading.dismiss();
          this.toast.create({
                              message : this.translate.instant('PAGES.MOVIE_DETAIL_PAGE.MESSAGE.REMOVE_FROM_MY_LIST_FAILED'),
                              position : 'bottom',
                              showCloseButton : false,
                              duration : 2000
                            }).present();
        });
  }
}
