import { HttpClient } from "@angular/common/http";
import { inject, Injectable, signal } from "@angular/core";
import { map, Observable, shareReplay } from "rxjs";
import { Movie } from "../interfaces/movie";
import { environment } from "../../environments/environment.development";
import { MovieResponse } from "../interfaces/movie-response";

@Injectable({
  providedIn:'root'
})
export class MovieService {


  private readonly http=inject(HttpClient) 
  private readonly url =environment.url_api
  private readonly key =environment.api_key
  private readonly movieUrl=environment.url_movie_api



  public movieList = signal<Movie[]>([]);
  public selectedMovie=signal<Movie|null>(null)
  public wishList=signal<Movie[]>([]);


    getMovieList():Observable<Movie[]> {
    return this.http
    .get<MovieResponse>(`${this.url}?api_key=${this.key}`).pipe(
       map(response=>response.results)
      //shareReplay({bufferSize:1, refCount:false})) 
    )
  }
  getMovieById(id: number) {
    return this.http.get<Movie>(`${this.movieUrl}/${id}?api_key=${this.key}`).pipe(
      map(response=>response)
    )
  }
  addToWishList(movie:Movie){
    this.wishList.update(wishList=>[...wishList,movie])
    localStorage.setItem('WishList',JSON.stringify(this.wishList()));
  }
}
//le filtrage c-a-d la mise à jour de la page à chaque recherche