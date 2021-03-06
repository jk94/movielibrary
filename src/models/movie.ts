export interface Movie {

  vote_average?: number;
  vote_count?: number;
  id?: number;
  video?: string | boolean;
  videos?: {
    results: {
      id: string,
      iso_639_1: string,
      iso_3166_1: string,
      key: string;
      name: string;
      site: string;
      size: number;
      type: string;
    }[]
  }
  title?: string;
  media_type: string;
  popularity?: string;
  poster_path?: string;
  original_language?: string;
  original_title?: string;
  genre_ids?: number[];
  backdrop_path?: string;
  adult?: boolean;
  overview?: string;
  release_date?: string;
}
