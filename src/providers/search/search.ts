import { Injectable } from '@angular/core';
import { SearchApi } from "../../api/search.api";
import { Logger } from "../../utils/logger";

/*
  Generated class for the SearchProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class SearchProvider {

  constructor(public searchApi: SearchApi) {

  }

  public search(query: string): Promise<any> {
    return new Promise((resolve, reject) => {
      this.searchApi.searchMultiple(query)
          .subscribe(result => {
            Logger.log(result);
            resolve(result.body.results);
          }, error => {
            Logger.error(error);
          });
    })
  }

}
