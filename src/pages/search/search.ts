import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { SearchProvider } from "../../providers/search/search";

/**
 * Generated class for the SearchPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
             selector : 'page-search',
             templateUrl : 'search.html',
           })
export class SearchPage {

  a: any;
  visibleItems: any[];
  searchInput: string;

  constructor(public navCtrl: NavController, public navParams: NavParams, public search: SearchProvider) {
  }

  ionViewDidLoad() {
  }

  getItems() {
    console.log(this.searchInput);
    this.search.search(this.searchInput)
        .then(results => this.visibleItems = results)
        .catch(error => {});
  }

}
