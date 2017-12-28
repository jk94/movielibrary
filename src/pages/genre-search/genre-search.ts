import { Component } from '@angular/core';
import { Loading, LoadingController, NavController, NavParams } from 'ionic-angular';
import { GenreProvider } from "../../providers/genre/genre.provider";
import { Movie } from "../../models/movie";
import { TranslateService } from "@ngx-translate/core";
import { MovieDetailPage } from "../movie-detail/movie-detail";

@Component({
             selector : 'page-genre-search',
             templateUrl : 'genre-search.html',
           })
export class GenreSearchPage {

  genreItem: { id: number, name: string };
  visibleItems: Movie[]    = [];
  public generPage: number = 1;

  constructor(private navCtrl: NavController,
              private navParams: NavParams,
              private genre: GenreProvider,
              private loadingCtrl: LoadingController,
              private translate: TranslateService) {
    this.genreItem = this.navParams.get('genre');
    this.getMovies(1).catch(() => this.navCtrl.pop());
  }

  ionViewDidLoad() {

  }

  private getMovies(page?: number): Promise<any> {
    return new Promise((resolve, reject) => {
      this.genre.getMoviesToGenre(this.genreItem.id, page ? page : 1)
          .then(movies => {
            console.log(movies);
            if (page == 1)
              this.visibleItems = movies;
            if (page > 1)
              this.visibleItems = [].concat(this.visibleItems, movies);
            resolve();
          })
          .catch(err => {reject(err)});
    })

  }

  doRefresh(event) {
    this.generPage = 1;
    if (event.state != 'refreshing')
      return;
    let loading: Loading = this.loadingCtrl.create(
      {
        content : this.translate.instant('SEARCH_TAB.LOADING_TEXT')
      });
    loading.present();
    this.getMovies(this.generPage)
        .then(() => {
          loading.dismiss();
          event.complete();
        }).catch((err) => {console.log(err); });
  }

  infiniteGenre(infiniteScroll) {
    this.getMovies(++this.generPage)
        .then(() => {infiniteScroll.complete()})
        .catch(() => { infiniteScroll.complete(); })
  }

  openSearchResult(item: Movie) {
    this.navCtrl.push(MovieDetailPage, { movieID : item.id })
  }

}
