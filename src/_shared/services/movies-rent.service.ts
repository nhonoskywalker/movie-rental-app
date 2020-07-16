import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LoginRequest } from '../messages/login-request.model';
import { Response } from './../models/Response';
import { environment } from 'src/environments/environment';
import { Movie } from '../models/movies.model';
import { MovieRented } from './../models/movies-rented.model';

@Injectable({
  providedIn: 'root'
})
export class MovieRentService {

  constructor(
    private httpClient: HttpClient,
  ) {
   }

  getMoviesRented(): Observable<MovieRented[]>{
    let requestBody: {};
    return this.httpClient.get<MovieRented[]>(`${environment.api_url}/movieRented`, requestBody);
  }

  rentMovie(model: MovieRented){

    return this.httpClient.post<Movie[]>(`${environment.api_url}/movieRented`, model);
  }

  returnMovie(model: MovieRented){
    return this.httpClient.put<MovieRented>(`${environment.api_url}/movieRented/${model.id}`, model);
  }

}
