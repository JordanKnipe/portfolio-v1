// src/app/movie.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environment';  // Correct the path if needed
import { Movie, Provider } from './movie.model';  // Assuming Provider is also defined here

@Injectable({
  providedIn: 'root'
})
export class MovieService {
  private baseUrl: string = 'https://api.themoviedb.org/3';

  constructor(private http: HttpClient) {}

  getProviders(): Observable<Provider[]> {
    console.log("fetching..")
    return this.http.get<Provider[]>(`${this.baseUrl}/watch/providers/movie?api_key=${environment.TMDB_KEY}&language=en-US&watch_region=AU`);
  }

  getMoviesByProvider(providerId: string): Observable<Movie[]> {
    return this.http.get<Movie[]>(`${this.baseUrl}/discover/movie?api_key=${environment.TMDB_KEY}&with_watch_providers=${providerId}&watch_region=AU&sort_by=primary_release_date.desc`);
  }
  getVideos(movieId: number): Observable<any> {  // Change `any` to a more specific type if you have it
    return this.http.get<any>(`${this.baseUrl}/movie/${movieId}/videos?api_key=${environment.TMDB_KEY}`);
}


}
