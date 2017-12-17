import { ErrorHandler, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from "@ngx-translate/http-loader";
import { HttpClient, HttpClientModule } from "@angular/common/http";
import { ComponentsModule } from "../components/components.module";
import { CommonModule } from "@angular/common";
import { MyApp } from './app.component';

import { AboutPage } from '../pages/about/about';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';
import { SearchPage } from "../pages/search/search";
import { SettingsPage } from "../pages/settings/settings";
import { ListPage } from "../pages/list/list";
import { MovieDetailPage } from "../pages/movie-detail/movie-detail";
import { GenreSearchPage } from "../pages/genre-search/genre-search";

import { StatusBar } from '@ionic-native/status-bar';
import { Globalization } from "@ionic-native/globalization";
import { Keyboard } from "@ionic-native/keyboard";
import { SplashScreen } from '@ionic-native/splash-screen';
import { NativeStorage } from "@ionic-native/native-storage";
import { YoutubeVideoPlayer } from "@ionic-native/youtube-video-player";

import { SearchProvider } from '../providers/search/search.provider';
import { MovieProvider } from '../providers/movie/movie.provider';
import { MovieListProvider } from '../providers/movie-list/movie-list';
import { GenreProvider } from '../providers/genre/genre.provider';

import { MovieApi } from "../api/movie.api";
import { SearchApi } from "../api/search.api";
import { PosterApi } from "../api/poster.api";
import { GenreApi } from "../api/genre.api";
import { InAppBrowser } from "@ionic-native/in-app-browser";
import { PipesModule } from "../pipes/pipes.module";

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
              ListPage,
              MovieDetailPage,
              GenreSearchPage
            ],
            imports : [
              BrowserModule,
              CommonModule,
              HttpClientModule,
              IonicModule.forRoot(MyApp),
              TranslateModule.forRoot({
                                        loader : {
                                          provide : TranslateLoader,
                                          useFactory : createTranslateLoader,
                                          deps : [ HttpClient ]
                                        }
                                      }),
              ComponentsModule,
              PipesModule
            ],
            bootstrap : [ IonicApp ],
            entryComponents : [
              MyApp,
              AboutPage,
              HomePage,
              TabsPage,
              SearchPage,
              SettingsPage,
              ListPage,
              MovieDetailPage,
              GenreSearchPage
            ],
            providers : [
              StatusBar,
              SplashScreen,
              Globalization,
              Keyboard,
              NativeStorage,
              YoutubeVideoPlayer,
              InAppBrowser,
              SearchApi,
              PosterApi,
              MovieApi,
              GenreApi,
              SearchProvider,
              MovieProvider,
              GenreProvider,
              MovieListProvider,
              { provide : ErrorHandler, useClass : IonicErrorHandler }
            ]
          })
export class AppModule {}
