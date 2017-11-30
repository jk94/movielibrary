import { HttpParams } from "@angular/common/http";

export abstract class Api {

  protected baseUrl        = 'https://api.themoviedb.org/3';
  private apiKey: string   = "7464d21bf6e585b4e9395f6d90cfa860";
  private language: string = "de-DE";
  private region: string   = "DE";

  constructor() {

  }

  protected getDefaultParams(): HttpParams {
    return new HttpParams()
      .set('api_key', this.apiKey)
      .set('language', this.language)
      .set('region', this.region);
  }

}
