import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { MovieService } from '../../services/movie-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-movie-list',
  imports: [],
  templateUrl: './movie-list.html',
  styleUrl: './movie-list.css',
})
export class MovieList implements OnInit {
  router=inject(Router)
  movieService = inject(MovieService);
  private cdr = inject(ChangeDetectorRef);

  ngOnInit(): void {
  this.movieService.getMovieList().subscribe({
    next: response => {
      this.movieService.movieList.set(response);
      console.log(response);
      this.cdr.markForCheck();
    },
  });
} 

navigateTo(movie: { id: string | number }) {
  this.router.navigate(['/', movie.id]);
}

} 