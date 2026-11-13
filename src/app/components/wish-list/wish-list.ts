import { Component, inject, OnInit } from '@angular/core';
import { Movie } from '../../interfaces/movie';
import { MovieService } from '../../services/movie-service';

@Component({
  imports: [],
  selector: 'app-wish-list',
  styleUrl: './wish-list.css',
  templateUrl: './wish-list.html',
})
export class WishList implements OnInit {
  public readonly movieService = inject(MovieService);

  ngOnInit(): void {
    const savedMovies = localStorage.getItem('WishList');

    if (!savedMovies) {
      this.movieService.wishList.set([]);
      return;
    }

    try {
      const parsedMovies = JSON.parse(savedMovies) as Movie[];
      if (Array.isArray(parsedMovies)) {
        this.movieService.wishList.set(parsedMovies);
      }
    } catch (error) {
      console.error('Failed to load wishlist from localStorage', error);
      localStorage.removeItem('WishList');
      this.movieService.wishList.set([]);
    }
  }
}
