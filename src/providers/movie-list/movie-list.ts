import { Injectable } from '@angular/core';
import { Movie } from "../../models/movie";
import { NativeStorage } from "@ionic-native/native-storage";
import { Platform } from "ionic-angular";
import { Logger } from "../../utils/logger";

@Injectable()
export class MovieListProvider {

  private myList: Movie[]         = [];
  readonly MOVIE_LIST_STORAGE_KEY = 'movie_list_storage_key';

  constructor(platform: Platform,
              private nativeStorage: NativeStorage) {
    platform.ready().then(() => {
      nativeStorage.getItem(this.MOVIE_LIST_STORAGE_KEY)
                   .then(response => {this.myList = response})
                   .catch(err => {Logger.log(err)});
    });
  }

  public getMyList(): Movie[] {
    return this.myList;
  }

  public addToMyList(movie: Movie): Promise<void> {
    return new Promise((resolve, reject) => {
      if (!this.isInMyList(movie)) {
        this.myList.push(movie);
        this.saveMyList()
            .then(() => {resolve()})
            .catch(() => reject());
      } else {
        Logger.log('already in list');
        resolve();
      }
    })
  }

  public removeFromMyList(movie: Movie): Promise<void> {
    return new Promise((resolve, reject) => {
      if (this.isInMyList(movie)) {
        this.myList = this.myList.filter(x => x.id != movie.id);
        this.saveMyList()
            .then(() => {resolve()})
            .catch(() => reject());
      } else {
        resolve();
      }
    })
  }

  public isInMyList(movie: Movie): boolean {
    return !!this.myList.find(x => x.id == movie.id);
  }

  private saveMyList(): Promise<any> {
    return this.nativeStorage.setItem(this.MOVIE_LIST_STORAGE_KEY, this.myList);
  }
}
