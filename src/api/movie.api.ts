import { Api } from "./api";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs/Observable";
import { Injectable } from "@angular/core";

@Injectable()
export class MovieApi extends Api {

  constructor(public http: HttpClient) {
    super();
  }

  discoverMovie(page?: number): Observable<any> {
    if (page && page > 0 && page <= 100) {
      let params = this.getDefaultParams()
                       .set('include_adult', 'true');
      if (page)
        params = params.set('page', '' + page);
      return this.http.get(this.baseUrl + '/discover/movie',
        { params : params, observe : 'response' });
    }
    else
      return Observable.create(observer => {
        observer.error('Page must be between 1 and 100');
      });
  }

  getMovie(movieID: number): Observable<any> {
    let params = this.getDefaultParams()
                     .set('append_to_response', 'videos,images,release_dates');

    return this.http.get(`${this.baseUrl}/movie/${movieID}`, {
      params : params,
      observe : 'response'
    })
  };

  getPopular(page?: number): Observable<any> {

    if (page && page > 0 && page <= 100) {
      let params = this.getDefaultParams()
                       .set('include_adult', 'true');
      if (page)
        params = params.set('page', '' + page);
      return this.http.get(this.baseUrl + '/movie/popular',
        {
          params : params,
          observe : 'response'
        });
    }
    else
      return Observable.create(observer => {
        observer.error('Page must be between 1 and 100');
      });
  }

}
