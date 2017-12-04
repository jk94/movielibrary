import { Api } from "./api";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs/Observable";
import { Injectable } from "@angular/core";

@Injectable()
export class MovieApi extends Api {

  constructor(public http: HttpClient) {
    super();
  }

  discoverMovie(): Observable<any> {
    let params = this.getDefaultParams()
                     .set('include_video', 'true')
                     .set('include_adult', 'true');
    return this.http.get(this.baseUrl + '/discover/movie',
      { params : params, observe : 'response' });
  }

  movie(movieID: number): Observable<any> {
    let params = this.getDefaultParams()
                     .set('append_to_response', 'videos,images');

    return this.http.get(`${this.baseUrl}/movie/${movieID}`, {
      params : params,
      observe : 'response'
    })
  }
}
