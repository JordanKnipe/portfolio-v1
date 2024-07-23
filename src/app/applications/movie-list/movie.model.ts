export interface Movie {
  id: number;
  title: string;
  original_title: string;
  poster_path: string;
  overview: string;
  release_date: string;
  genre_ids: number[];
  original_language: string;
  popularity: number;
  vote_count: number;
  vote_average: number;
  adult: boolean;
  video: boolean;
  backdrop_path: string;
}


  export interface Provider {
    provider_id: number;
    provider_name: string;
    logo_path?: string; // Optional because not all responses may include a logo
    display_priority?: number; // Optional
    logo_sizes?: string[]; // Optional, array of sizes available for the logo
    provider_country?: string; // Optional, country the provider is available in
  }
  