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
  visibleItems: Movie[] = [];

  constructor(private navCtrl: NavController,
              private navParams: NavParams,
              private genre: GenreProvider,
              private loadingCtrl: LoadingController,
              private translate: TranslateService) {
    this.genreItem = this.navParams.get('genre');
    this.getMovies().catch(() => this.navCtrl.pop());
  }

  ionViewDidLoad() {

  }

  private getMovies(): Promise<any> {
    return new Promise((resolve, reject) => {
      this.genre.getMoviesToGenre(this.genreItem.id)
          .then(movies => {
            this.visibleItems = movies;
            resolve();
          })
          .catch(err => {reject(err)});
    })

  }

  doRefresh(event) {
    console.log(event);
    if (event.state != 'refreshing')
      return;
    let loading: Loading = this.loadingCtrl.create(
      {
        content : this.translate.instant('SEARCH_TAB.LOADING_TEXT')
      });
    loading.present();
    this.getMovies()
        .then(() => {
          loading.dismiss();
          event.complete();
        }).catch((err) => {console.log(err); });
  }

  openSearchResult(item: Movie) {
    this.navCtrl.push(MovieDetailPage, { movieID : item.id })
  }

}
