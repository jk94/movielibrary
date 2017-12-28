import { Component, OnInit, Renderer, ViewChild } from '@angular/core';
import { List, LoadingController, NavController, NavParams, Platform, Searchbar } from 'ionic-angular';
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

  public searchPage = 1;
         searchInput: string;
         searchInputOfLastResult: string;
         visibleItems: Movie[];

  lastSearchEntries: string[] = [];

  displayMode: 'search' | 'result';
  pullMaxValue: number = 100;

  @ViewChild(Searchbar) searchBar: Searchbar;
  @ViewChild(List) resultList: List;

  readonly LAST_SEARCH_ENTRIES: string = "LAST_SEARCH_ENTRIES";

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public search: SearchProvider,
              private renderer: Renderer,
              private loadingCtrl: LoadingController,
              private translate: TranslateService,
              private storage: NativeStorage,
              private platform: Platform) {
    this.displayMode = 'search';
  }

  ngOnInit() {
    this.searchPage = 1;
    this.storage.getItem(this.LAST_SEARCH_ENTRIES).then(items => {
      this.lastSearchEntries = items
    })
        .catch(() => {
          this.storage.setItem(this.LAST_SEARCH_ENTRIES, []);
        });
    this.pullMaxValue = this.platform.height();
  }

  onSearchSubmit(event) {
    this.displayMode = 'result';
    this.resetResults();
    this.addSearchEntry(this.searchInput);
    let loading = this.loadingCtrl.create(
      {
        content : this.translate.instant('SEARCH_TAB.LOADING_TEXT')
      });
    loading.present();
    this.getItems(this.searchInput, this.searchPage, event)
        .then(() => {
          loading.dismiss();
        }).catch((err) => {console.log(err); });
  }

  doRefresh(event) {
    if (event.state != 'refreshing')
      return;
    this.resetResults();
    let loading = this.loadingCtrl.create(
      {
        content : this.translate.instant('SEARCH_TAB.LOADING_TEXT')
      });
    loading.present();
    let query: string = this.searchInput.length > 0 ? this.searchInput : this.searchInputOfLastResult;
    this.getItems(query, this.searchPage)
        .then(() => {
          loading.dismiss();
          event.complete();
        }).catch((err) => {console.log(err); });

  }

  resetResults(): void {
    this.searchPage = 1;
    //this.visibleItems = [];
  }

  infiniteSearch(infiniteScroll) {
    this.getItems(this.searchInputOfLastResult, ++this.searchPage)
        .then(() => {infiniteScroll.complete()})
        .catch(() => { infiniteScroll.complete(); })
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
    this.saveSearchInputs();
  }

  removeFromSearchList(item: string) {
    this.lastSearchEntries = this.lastSearchEntries.filter(x => x != item);
    this.saveSearchInputs();
    this.searchBar.setFocus();
    setTimeout(() => {
      this.displayMode = 'search';
    }, 200);
  }

  private getItems(query: string, page?: number, event?: any): Promise<void | any> {
    return new Promise((resolve, reject) => {
      this.search.search(query, page)
          .then(results => {
            this.searchInputOfLastResult = query;
            if (page == 1)
              this.visibleItems = results;
            if (page > 1)
              this.visibleItems = [].concat(this.visibleItems, results);
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

  private saveSearchInputs() {
    this.storage.setItem(this.LAST_SEARCH_ENTRIES, this.lastSearchEntries);
  }

}
