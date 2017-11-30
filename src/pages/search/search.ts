import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { SearchApi } from "../../api/search.api";

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

  constructor(public navCtrl: NavController, public navParams: NavParams, public searchApi: SearchApi) {
  }

  ionViewDidLoad() {
  }

  getItems() {
    console.log(this.searchInput);
    this.searchApi.searchMultiple(this.searchInput)
        .subscribe(result => {
          console.log(result);
          this.visibleItems = JSON.parse(JSON.stringify(result.body.results));
        }, error => {console.log(error)});
  }

}
