import { Api } from "./api";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs/Observable";
import { Injectable } from "@angular/core";

@Injectable()
export class GenreApi extends Api {

  constructor(public http: HttpClient) {
    super();
  }

  getMovieGenre(): Observable<any> {
    let params = this.getDefaultParams();

    return this.http.get(this.baseUrl + '/genre/movie/list',
      { params : params, observe : 'response' });
  }

  getTVGenre(): Observable<any> {
    let params = this.getDefaultParams();

    return this.http.get(this.baseUrl + '/genre/tv/list',
      { params : params, observe : 'response' });
  }

  getMovies(genreID: number): Observable<any> {
    let params = this.getDefaultParams()
                     .set('include_adult', 'true');

    return this.http.get(`${this.baseUrl}/genre/${genreID}/movies`, {
      params : params,
      observe : 'response'
    })
  };

}
