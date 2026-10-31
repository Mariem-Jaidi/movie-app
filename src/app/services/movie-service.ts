import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { map, Observable } from "rxjs";
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
  public movieList: Movie[]=[]
    getMovieList():Observable<Movie[]> {
    return this.http.get<MovieResponse>(`${this.url}?api_key=${this.key}`).pipe(
       map(response=>response.results)) 
    
  }
}