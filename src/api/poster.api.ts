import { Api } from "./api";
import { HttpClient } from "@angular/common/http";
import { Logger } from "../utils/logger";
import { Injectable } from "@angular/core";

@Injectable()
export class PosterApi extends Api {

  private imagesConfiguration;

  constructor(public http: HttpClient) {
    super();

    this.http.get(this.baseUrl + '/configuration', { params : this.getDefaultParams() })
        .subscribe((response: any) => {
          this.imagesConfiguration = response.images;
          Logger.log(response);
        }, Logger.error);
  }

  getPoster(posterPath: string) {
    this.http.get('https://image.tmdb.org/t/p/w500/kqjL17yufvn9OVLyXYpvtyrFfak.jpg')
        .subscribe();
  }

  getPosterLink(posterPath: string) {
    return `https://image.tmdb.org/t/p/w300${posterPath}`;
  }

  getBackdropLink(backdropPath: string) {
    return `https://image.tmdb.org/t/p/w300${backdropPath}`;
  }

}
