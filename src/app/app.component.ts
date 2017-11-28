import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { TabsPage } from '../pages/tabs/tabs';
import { TranslateService } from "@ngx-translate/core";
import { Globalization } from "@ionic-native/globalization";

@Component({
             templateUrl : 'app.html'
           })
export class MyApp {
  rootPage: any = TabsPage;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen, translate: TranslateService, globalization: Globalization) {
    // this language will be used as a fallback when a translation isn't found in the current language
    translate.setDefaultLang('de');
    translate.use('de');


    //TODO Localize here
    globalization.getPreferredLanguage().then((lang) => {
      //translate.use(lang.value);
    }).catch(() => {

    });

    platform.ready().then(() => {

      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });
  }
}
