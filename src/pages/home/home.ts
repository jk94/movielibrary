import { Component, OnInit } from '@angular/core';
import { Loading, LoadingController, NavController } from 'ionic-angular';
import { MovieProvider } from "../../providers/movie/movie.provider";
import { SearchPage } from "../search/search";
import { GenreProvider } from "../../providers/genre/genre.provider";
import { GenreSearchPage } from "../genre-search/genre-search";
import { TranslateService } from "@ngx-translate/core";

@Component({
             selector : 'page-home',
             templateUrl : 'home.html'
           })
export class HomePage implements OnInit {

  public discoverPage        = 1;
         visibleItems: any[] = [];
         genresList: any[]   = [];
         loading: Loading;

  discoverMode: 'popular' | 'genre' = 'popular';

  constructor(private navCtrl: NavController,
              private movie: MovieProvider,
              private genre: GenreProvider,
              private loadingCtrl: LoadingController,
              private translate: TranslateService) { }

  ngOnInit() {
    this.discoverPage = 1;
    if (this.visibleItems.length > 0)
      this.popularMovies(this.discoverPage);
    else {
      this.loading = this.loadingCtrl.create(
        {
          enableBackdropDismiss : false,
          content : this.translate.instant('SEARCH_TAB.LOADING_TEXT')
        }
      );
      this.loading.present()
      this.popularMovies(this.discoverPage)
          .then(() => {this.loading.dismiss()})
          .catch(() => {this.loading.dismiss()})
    }
  }

  showSearch() {
    this.navCtrl.push(SearchPage);
  }

  infiniteDiscover(infiniteScroll) {
    this.popularMovies(++this.discoverPage)
        .then(() => {infiniteScroll.complete()})
        .catch(() => { infiniteScroll.complete(); })
  }

  swiped(event) {
    console.log(event);
    switch (event.direction) {
      case 2: //left
        this.discoverMode = 'genre';
        break;
      case 4: //right
        this.discoverMode = 'popular';
        break;
    }
  }

  segmentChanged() {
    switch (this.discoverMode) {
      case 'genre':
        if (this.genresList.length != 0) {
          this.getGenre();
        } else {
          this.loading = this.loadingCtrl.create(
            {
              enableBackdropDismiss : false,
              content : this.translate.instant('SEARCH_TAB.LOADING_TEXT')
            }
          );
          this.loading.present()
              .then(this.getGenre.bind(this))
              .then(() => this.loading.dismiss())
              .catch(() => this.loading.dismiss());
        }
        break;
      default:
    }
  }

  genreClicked(genre) {
    this.navCtrl.push(GenreSearchPage, { genre : genre });
  }

  private popularMovies(page: number): Promise<any> {
    return new Promise((resolve, reject) => {
      this.movie.getPopular(page)
          .then(results => {
            if (page == 1)
              this.visibleItems = results;
            if (page > 1)
              this.visibleItems = [].concat(this.visibleItems, results);
            resolve();
          })
          .catch(error => {reject(error)});
    });
  }

  private getGenre(): Promise<any> {
    return new Promise((resolve, reject) => {
      this.genre.getMovieGenre().then(result => {
        this.genresList = result.genres;
        resolve();
      }).catch(err => {reject(err)})
    })
  }
}
