import { Injectable } from '@angular/core';
import { SearchApi } from "../../api/search.api";
import { Logger } from "../../utils/logger";

@Injectable()
export class SearchProvider {

  constructor(public searchApi: SearchApi) {

  }

  public search(query: string): Promise<any> {
    return new Promise((resolve, reject) => {
      this.searchApi.searchMovies(query)
          .subscribe(result => {
            Logger.log(result);
            resolve(result.body.results);
          }, error => {
            Logger.error(error);
            reject(error);
          });
    })
  }

}
