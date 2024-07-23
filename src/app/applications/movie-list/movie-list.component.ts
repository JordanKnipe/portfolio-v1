// src/app/movie-list/movie-list.component.ts
import { Component, OnInit } from '@angular/core';
import { Movie, Provider } from './movie.model';
import { MovieService } from './MovieService.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-movie-list',
  templateUrl: './movie-list.component.html',
  imports:[],
  styleUrls: ['./movie-list.component.scss'],
  standalone: true
})
export class MovieListComponent implements OnInit {
  providers: any | undefined;
  currentPage: number = 1;
  itemsPerPage: number = 18 // Set how many movies per page
  pagedMovies: Movie[] = [];
  selectedProviderId: number | undefined;
  selectedProviders: number[] = []; // Store selected provider IDs
  movies: any = []; // Store fetched movies
  allMovies: any = []; // Store fetched movies
  genreArray: any = [];
  baseUrl: string = 'https://api.themoviedb.org/3';
  showModal: boolean = false;
  selectedMovie: Movie | null = null;

  genreIds = {
    28: 'Action',
    12: 'Adventure',
    16: 'Animation',
    35: 'Comedy',
    80: 'Crime',
    99: 'Documentary',
    18: 'Drama',
    10751: 'Family',
    14: 'Fantasy',
    36: 'History',
    27: 'Horror',
    10402: 'Music',
    9648: 'Mystery',
    10749: 'Romance',
    878: 'Science Fiction',
    10770: 'TV Movie',
    53: 'Thriller',
    10752: 'War',
    37: 'Western',
    10759: 'Action & Adventure',
    10762: 'Kids',
    10763: 'News',
    10764: 'Reality',
    10765: 'Sci-Fi & Fantasy',
    10766: 'Soap',
    10767: 'Talk',
    10768: 'War & Politics'
  };
  
  currentGenreId: string = ''; // Store the current genre id

  constructor(private movieService: MovieService) {}

  ngOnInit() {
    this.movieService.getProviders()
      .subscribe({
        next: (providers:any) => {
          this.providers = providers.results;
          this.providers = this.providers.slice(0, 14);
          console.log(this.providers)
        },
        error: (error:Error) => console.error('Error fetching providers:', error)
      });
      this.prepareGenreArray();
      this.fetchMovies();//this.applyPagination();
  }


  openModal(movie: Movie): void {
    this.selectedMovie = movie;
    this.showModal = true;
  }

  closeModal(): void {
    this.showModal = false;
  }
  fetchMovies(): void {
    this.movies = []; // Clear the movies list right away
    this.allMovies = []; // Also clear the allMovies list to ensure no old data remains
  
    let fetchCount = 0;
    if (this.selectedProviders.length === 0) {
      this.applyPagination(); // Update the view to show no movies
      return; // Exit the function since there are no providers to fetch from
    }
    this.selectedProviders.forEach(providerId => {
      this.movieService.getMoviesByProvider(providerId.toString())
        .subscribe({
          next: (movies: any) => {
            this.allMovies = [...new Map([...this.allMovies, ...movies.results].map(movie => [movie['id'], movie])).values()];
            this.allMovies.sort((a:any, b:any) => a.title.localeCompare(b.title));
            fetchCount++;
            if (fetchCount === this.selectedProviders.length) {
              this.applyGenreFilter();
              this.applyPagination();
            }
          },
          error: (error) => console.error('Error fetching movies:', error)
        });
    });
  }

toggleProviderSelection(providerId: number): void {
  const index = this.selectedProviders.indexOf(providerId);
  if (index > -1) {
    this.selectedProviders.splice(index, 1); // Remove the provider if already selected
  } else if (this.selectedProviders.length < 3) {
    this.selectedProviders.push(providerId); // Add the provider if not already selected and the limit is not reached
  }
  this.onSubmit(); // Trigger the fetch process whenever the selection changes
}

onSubmit(): void {
  this.allMovies = []; // Clear all movies before fetching new ones
  this.fetchMovies(); // Fetch the movies based on the currently selected providers
  this.moviesDisplaying = true;
}
  prepareGenreArray() {
    this.genreArray = Object.entries(this.genreIds).map(([key, value]) => ({ key, value }));
  }
  applyGenreFilter(): void {
    if (this.currentGenreId) {
      this.movies = this.allMovies.filter((movie:any) => movie.genre_ids.includes(parseInt(this.currentGenreId, 10)));
    } else {
      this.movies = [...this.allMovies];
    }
  }

  filterByGenre(event: Event): void {
    const selectElement = event.target as HTMLSelectElement;
    this.currentGenreId = selectElement.value;
    this.applyGenreFilter();
    this.applyPagination();
  }
  moviesDisplaying:boolean = false;

  
  applyPagination() {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    this.pagedMovies = this.movies.slice(startIndex, endIndex);
  }

  nextPage() {
    if ((this.currentPage - 1) * this.itemsPerPage < this.movies.length) {
      this.currentPage++;
      this.applyPagination();
    }
  }

  previousPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.applyPagination();
    }
  }
  handleClick(movie: Movie): void {
    console.log('Movie clicked:', movie);
  }
}
