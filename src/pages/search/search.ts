import { Component, OnInit, Renderer, ViewChild } from '@angular/core';
import { List, LoadingController, NavController, NavParams, Searchbar } from 'ionic-angular';
import { SearchProvider } from "../../providers/search/search.provider";
import { Movie } from "../../models/movie";
import { MovieDetailPage } from "../movie-detail/movie-detail";
import { TranslateService } from "@ngx-translate/core";
import { NativeStorage } from "@ionic-native/native-storage";

@Component({
             selector : 'page-search',
             templateUrl : 'search.html',
           })
export class SearchPage implements OnInit {

  visibleItems: Movie[];
  searchInput: string;

  lastSearchEntries: string[] = [];

  displayMode: 'search' | 'result';

  @ViewChild(Searchbar) searchBar: Searchbar;
  @ViewChild(List) resultList: List;

  readonly LAST_SEARCH_ENTRIES: string = "LAST_SEARCH_ENTRIES";

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public search: SearchProvider,
              private renderer: Renderer,
              private loadingCtrl: LoadingController,
              private translate: TranslateService,
              private storage: NativeStorage) {
    this.displayMode = 'search';
  }

  ngOnInit() {
    this.storage.getItem(this.LAST_SEARCH_ENTRIES).then(items => {
      this.lastSearchEntries = items
    })
        .catch(() => {
          this.storage.setItem(this.LAST_SEARCH_ENTRIES, []);
        });
  }

  onSearchSubmit(event) {
    this.displayMode = 'result';
    this.addSearchEntry(this.searchInput);
    let loading = this.loadingCtrl.create(
      {
        content : this.translate.instant('SEARCH_TAB.LOADING_TEXT')
      });
    loading.present();
    this.getItems(event)
        .then(() => {
          loading.dismiss();
        }).catch((err) => {console.log(err); });
  }

  doRefresh(event) {
    let loading = this.loadingCtrl.create(
      {
        content : this.translate.instant('SEARCH_TAB.LOADING_TEXT')
      });
    loading.present();
    this.getItems()
        .then(() => {
          loading.dismiss();
          event.complete();
        }).catch((err) => {console.log(err); });
  }

  onSearchFocus(event) {
    this.displayMode = 'search';
  }

  onSearchBlur(event) {
    setTimeout(() => {
      this.displayMode = 'result';
    }, 200);
  }

  searchInputClick(item) {
    this.lastSearchEntries = this.lastSearchEntries.filter(entry => item != entry);
    this.searchInput       = item;
    this.onSearchSubmit(null);
  }

  addSearchEntry(value: string) {
    this.lastSearchEntries = this.lastSearchEntries.filter(item => item != value);
    this.lastSearchEntries = [ value, ...this.lastSearchEntries ];
    this.lastSearchEntries = this.lastSearchEntries.slice(0, 10);
    this.storage.setItem(this.LAST_SEARCH_ENTRIES, this.lastSearchEntries);
  }

  getItems(event?: any): Promise<void | any> {
    return new Promise((resolve, reject) => {
      this.search.search(this.searchInput)
          .then(results => {
            this.visibleItems = results;
            if (event)
              this.renderer.invokeElementMethod(event.target, 'blur');
            resolve();
          })
          .catch(error => {reject(error);});
    });

  }

  openSearchResult(movie: Movie) {
    this.navCtrl.push(MovieDetailPage, { movieID : movie.id });
  }

}
