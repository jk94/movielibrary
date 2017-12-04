import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Api } from "./api";

@Injectable()
export class SearchApi extends Api {

  constructor(public http: HttpClient) {
    super();
  }

  searchMultiple(search: string): any {
    let params = this.getDefaultParams()
                     .set('query', search)
                     .set('include_adult', 'true');

    return this.http.get(this.baseUrl + '/search/multi',
      {
        params : params,
        observe : "response"
      });
  }

  searchMovies(search: string): any {
    let params = this.getDefaultParams()
                     .set('query', search)
                     .set('include_adult', 'true');

    return this.http.get(this.baseUrl + '/search/movie',
      {
        params : params,
        observe : "response"
      });
  }

}
