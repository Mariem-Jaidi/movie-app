import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { MovieService } from '../../services/movie-service';

@Component({
  selector: 'app-movie-list',
  imports: [],
  templateUrl: './movie-list.html',
  styleUrl: './movie-list.css',
})
export class MovieList implements OnInit {
  movieService = inject(MovieService);
  private cdr = inject(ChangeDetectorRef);

  ngOnInit(): void {
    this.movieService.getMovieList().subscribe({
      next: response => {
        this.movieService.movieList = response;
        console.log(response);
        this.cdr.markForCheck();
      },
    });
  }
}