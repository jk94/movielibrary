import { ErrorHandler, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { MyApp } from './app.component';

import { AboutPage } from '../pages/about/about';
import { ContactPage } from '../pages/contact/contact';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { SearchPage } from "../pages/search/search";

import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from "@ngx-translate/http-loader";
import { HttpClient, HttpClientModule } from "@angular/common/http";
import { Globalization } from "@ionic-native/globalization";

export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
            declarations : [
              MyApp,
              AboutPage,
              ContactPage,
              HomePage,
              TabsPage,
              SearchPage
            ],
            imports : [
              BrowserModule,
              HttpClientModule,
              IonicModule.forRoot(MyApp),
              TranslateModule.forRoot({
                                        loader : {
                                          provide : TranslateLoader,
                                          useFactory : createTranslateLoader,
                                          deps : [ HttpClient ]
                                        }
                                      })
            ],
            bootstrap : [ IonicApp ],
            entryComponents : [
              MyApp,
              AboutPage,
              ContactPage,
              HomePage,
              TabsPage,
              SearchPage
            ],
            providers : [
              StatusBar,
              SplashScreen,
              Globalization,
              { provide : ErrorHandler, useClass : IonicErrorHandler }
            ]
          })
export class AppModule {}
