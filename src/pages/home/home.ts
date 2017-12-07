import { Component, OnInit } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { MovieProvider } from "../../providers/movie/movie.provider";
import { SearchPage } from "../search/search";

@Component({
             selector : 'page-home',
             templateUrl : 'home.html'
           })
export class HomePage implements OnInit {

  visibleItems: any[];
  public discoverPage = 1;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public movie: MovieProvider) { }

  ngOnInit() {
    this.discoverPage = 1;
    this.discoverMovies(this.discoverPage);
  }

  private discoverMovies(page: number): Promise<any> {

    return new Promise((resolve, reject) => {
      this.movie.discoverMovies(page)
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

  showSearch() {
    this.navCtrl.push(SearchPage);
  }

  infiniteDiscover(infiniteScroll) {
    this.discoverMovies(++this.discoverPage)
        .then(() => {infiniteScroll.complete()})
        .catch(() => { infiniteScroll.complete(); })
  }
}
