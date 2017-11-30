import { ErrorHandler, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { MyApp } from './app.component';

import { AboutPage } from '../pages/about/about';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { SearchPage } from "../pages/search/search";

import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from "@ngx-translate/http-loader";
import { HttpClient, HttpClientModule } from "@angular/common/http";
import { Globalization } from "@ionic-native/globalization";
import { SettingsPage } from "../pages/settings/settings";
import { ListPage } from "../pages/list/list";
import { SearchApi } from "../api/search.api";
import { SearchProvider } from '../providers/search/search';
import { ComponentsModule } from "../components/components.module";
import { PosterApi } from "../api/poster.api";

export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
            declarations : [
              MyApp,
              AboutPage,
              HomePage,
              TabsPage,
              SearchPage,
              SettingsPage,
              ListPage
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
                                      }),
              ComponentsModule
            ],
            bootstrap : [ IonicApp ],
            entryComponents : [
              MyApp,
              AboutPage,
              HomePage,
              TabsPage,
              SearchPage,
              SettingsPage,
              ListPage
            ],
            providers : [
              StatusBar,
              SplashScreen,
              Globalization,
              SearchApi,
              PosterApi,
              SearchProvider,
              { provide : ErrorHandler, useClass : IonicErrorHandler },
              SearchProvider
            ]
          })
export class AppModule {}
