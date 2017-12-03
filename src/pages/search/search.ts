import { Component, OnInit } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { SearchProvider } from "../../providers/search/search.provider";
import { MovieProvider } from "../../providers/movie/movie.provider";

@Component({
             selector : 'page-search',
             templateUrl : 'search.html',
           })
export class SearchPage implements OnInit {

  a: any;
  visibleItems: any[];
  searchInput: string;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public search: SearchProvider,
              public movie: MovieProvider) {
  }

  ionViewDidLoad() {
  }

  ngOnInit() {
    this.movie.discoverMovies()
        .then(results => this.visibleItems = results)
        .catch(error => {});
  }

  getItems() {
    console.log(this.searchInput);
    this.search.search(this.searchInput)
        .then(results => this.visibleItems = results)
        .catch(error => {});
  }

}
