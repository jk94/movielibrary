import { Injectable } from '@angular/core';
import { Movie } from "../../models/movie";
import { NativeStorage } from "@ionic-native/native-storage";
import { Platform } from "ionic-angular";
import { Logger } from "../../utils/logger";
import { MyListItem } from "../../models/my-list-item";

@Injectable()
export class MovieListProvider {

  private myList: MyListItem[];
  readonly MOVIE_LIST_STORAGE_KEY = 'movie_list_storage_key';

  constructor(private platform: Platform,
              private nativeStorage: NativeStorage) {
  }

  public getMyList(): Promise<MyListItem[]> {
    if (!this.myList)
      return new Promise((resolve, reject) => {
        this.platform.ready().then(() => {
          this.nativeStorage.getItem(this.MOVIE_LIST_STORAGE_KEY)
              .then(response => {
                this.myList = response;
                resolve(this.myList)
              })
              .catch(err => {
                Logger.log(err);
                this.myList = [];
                resolve(this.myList);
              });
        });
      });
    return new Promise<MyListItem[]>((resolve, reject) => resolve(this.myList));
  }

  public addToMyList(movie: Movie): Promise<void> {
    return new Promise((resolve, reject) => {
      this.isInMyList(movie)
          .then(inList => {
            if (!inList) {
              return this.getMyList();
            } else {
              Logger.log('already in list');
              reject()
            }
          })
          .then(list => {
            let listItem: MyListItem = { item : movie, added_to_list_at : Date.now() };
            list.push(listItem);
            return this.saveMyList()
          })
          .then(() => {resolve()})
          .catch(() => reject());
    });
  }

  public removeFromMyList(movie: Movie): Promise<void> {
    return new Promise((resolve, reject) => {
      this.isInMyList(movie)
          .then(inList => {
            if (inList) {
              this.myList = this.myList.filter(x => x.item.id != movie.id);
              this.saveMyList()
                  .then(() => {resolve()})
                  .catch(() => reject());
            } else {
              resolve();
            }
          });
    })
  }

  public isInMyList(movie: Movie): Promise<boolean> {
    return this.getMyList().then(list => {
      return !!list.find(x => x.item.id == movie.id);
    }).catch(() => false);
  }

  private saveMyList(): Promise<any> {
    return this.nativeStorage.setItem(this.MOVIE_LIST_STORAGE_KEY, this.myList);
  }
}
