import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Api } from "./api";
import { Observable } from "rxjs/Observable";

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

  searchMovies(search: string, page?: number): any {
    if (!page)
      page = 1;

    if (page && page > 0 && page <= 100) {
      let params = this.getDefaultParams()
                       .set('query', search)
                       .set('include_adult', 'true');
      if (page)
        params = params.set('page', '' + page);
      return this.http.get(this.baseUrl + '/search/movie',
        {
          params : params,
          observe : "response"
        });
    } else
      return Observable.create(observer => {
        observer.error('Page must be between 1 and 100');
      });
  }

}
