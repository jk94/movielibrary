import { Injectable } from '@angular/core';
import { GenreApi } from "../../api/genre.api";
import { Logger } from "../../utils/logger";

@Injectable()
export class GenreProvider {

  constructor(private genreApi: GenreApi) {

  }

  getMovieGenre(): Promise<any> {
    return new Promise((resolve, reject) => {
      this.genreApi.getMovieGenre()
          .subscribe(response => {
            Logger.log(response);
            resolve(response.body);
          }, err => {
            Logger.error(err);
            reject(err);
          });
    })
  }

  getMoviesToGenre(genreID: number): Promise<any> {
    return new Promise((resolve, reject) => {
      this.genreApi.getMovies(genreID)
          .subscribe(response => {
            Logger.log(response);
            resolve(response.body.results);
          }, err => {
            Logger.error(err);
            reject(err);
          });
    });
  }

}
