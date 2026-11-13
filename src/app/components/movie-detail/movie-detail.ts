import { Component, inject, OnInit} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs';
import { MovieService } from '../../services/movie-service';
import { Movie } from '../../interfaces/movie';

@Component({
  imports: [],
  selector: 'app-movie-detail',
  styleUrl: './movie-detail.css',
  templateUrl: './movie-detail.html',
})
export class MovieDetail implements OnInit {
  
  private router = inject(Router)
  private route = inject(ActivatedRoute)
  private movieService=inject(MovieService)
  
  ngOnInit(): void {
    
    this.route.paramMap.pipe(
      switchMap(params => {
        const id = Number(params.get('id'));
        return this.movieService.getMovieById(id!)
      })).subscribe(movie=>this.movieService.selectedMovie.set(movie))
  }
  backToMovieList(){
    this.router.navigate(['/'])
  }
  addToWish(movie: Movie | null) {
    if (movie) {
      this.movieService.addToWishList(movie);
    }
  }
}