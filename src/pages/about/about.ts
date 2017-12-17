import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { InAppBrowser } from "@ionic-native/in-app-browser";

@Component({
             selector : 'page-about',
             templateUrl : 'about.html'
           })
export class AboutPage {

  constructor(private navCtrl: NavController,
              private inAppBrowser: InAppBrowser) {

  }

  openTwitter() {
    let browser = this.inAppBrowser.create('https://twitter.com/JanKo135790', '_system', 'location=yes');
  }

  openMovieDB() {
    let browser = this.inAppBrowser.create('https://www.themoviedb.org', '_system', 'location=yes');
  }

}
