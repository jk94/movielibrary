import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from "@angular/common/http";

@Injectable()
export class SearchApi {

  baseUrl                  = 'https://api.themoviedb.org/3';
  private apiKey: string   = "7464d21bf6e585b4e9395f6d90cfa860";
  private language: string = "de-DE";
  private region: string   = "DE";

  public getDefaultParams(): HttpParams {
    return new HttpParams()
      .set('api_key', this.apiKey)
      .set('language', this.language)
      .set('region', this.region);
  }

  constructor(public http: HttpClient) {
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

}
