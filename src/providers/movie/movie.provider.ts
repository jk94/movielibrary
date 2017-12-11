import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MovieApi } from "../../api/movie.api";
import { Logger } from "../../utils/logger";

@Injectable()
export class MovieProvider {

  constructor(public http: HttpClient, public movieApi: MovieApi) {
  }

  discoverMovies(page?: number): Promise<any> {
    return new Promise((resolve, reject) => {
      this.movieApi.discoverMovie(page ? page : 1)
          .subscribe(result => {
            Logger.log(result);
            resolve(result.body.results);
          }, reject);
    });
  }

  getMovie(movieID: number): Promise<any> {
    return new Promise((resolve, reject) => {
      this.movieApi.movie(movieID)
          .subscribe(response => {
            Logger.log(response);
            resolve(response.body);
          }, error => {
            Logger.error(error);
            reject();
          })
    })
  }

  getVideo(videoKey: string): string {
    return 'https://www.youtube.com/watch?v=' + videoKey;
  }

}
