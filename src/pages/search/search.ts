import { Component, OnInit, Renderer, ViewChild } from '@angular/core';
import { List, NavController, NavParams, Searchbar } from 'ionic-angular';
import { SearchProvider } from "../../providers/search/search.provider";
import { MovieProvider } from "../../providers/movie/movie.provider";
import { Movie } from "../../models/movie";
import { MovieDetailPage } from "../movie-detail/movie-detail";

@Component({
             selector : 'page-search',
             templateUrl : 'search.html',
           })
export class SearchPage implements OnInit {

  visibleItems: any[];
  searchInput: string;
  isSearchVisible: boolean = false;
  displayMode: 'discover' | 'search';

  @ViewChild(Searchbar) searchBar: Searchbar;
  @ViewChild(List) resultList: List;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public search: SearchProvider,
              public movie: MovieProvider,
              private renderer: Renderer) {
    this.displayMode = "discover";
  }

  ionViewDidLoad() {
  }

  ngOnInit() {
    this.movie.discoverMovies()
        .then(results => this.visibleItems = results)
        .catch(error => {});
  }

  getItems(event) {
    this.search.search(this.searchInput)
        .then(results => {
          this.visibleItems = results;
          this.displayMode  = "search";
          this.renderer.invokeElementMethod(event.target, 'blur')
        })
        .catch(error => {});
  }

  showSearch() {
    this.isSearchVisible = true;
    console.log(this.searchBar.getNativeElement());
    this.searchBar.getNativeElement().style.display = 'flex';
    this.searchBar.setFocus();
  }

  cancelSearch() {
    this.isSearchVisible                            = false;
    this.searchBar.getNativeElement().style.display = 'none';
    this.searchInput                                = "";
  }

  openSearchResult(movie: Movie) {
    console.log('emiited');
    this.navCtrl.push(MovieDetailPage, { movieID : movie.id });
  }

}
