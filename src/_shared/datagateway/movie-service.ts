import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Response } from '../models/Response';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { Movie } from '../models/movies.model';

@Injectable({
  providedIn: 'root'
})
export class MovieService {
  constructor(private httpClient: HttpClient) { }

  public add(model: Movie): Observable<Response<void>> {
    const requestBody: any = {
      title: model.title,
      copyCode: model.copyCode,
      registrationId: model.registrationId,
      rented: false
    }
    const result: Observable<Response<void>> = this.httpClient.post<Response<void>>(`${environment.api_url}/movies`, requestBody);
    return result;
  }

  public update(model: Movie): Observable<Response<Movie>> {
    const requestBody: any = {
      id: model.id,
      title: model.title,
      copyCode: model.copyCode,
      registrationId: model.registrationId,
      rented: model.rented
    }
    const result: Observable<Response<Movie>> = this.httpClient.put<Response<Movie>>(`${environment.api_url}/movies/${model.id}`, requestBody);
    return result;
  }

  public getMovies(): Observable<Movie[]>{
    let requestBody: {};
    return this.httpClient.get<Movie[]>(`${environment.api_url}/movies`, requestBody);
  }


}
