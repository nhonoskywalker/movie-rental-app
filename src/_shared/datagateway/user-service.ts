import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../models/user.model';
import { Response } from '../models/Response';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private httpClient: HttpClient) { }

  public add(model: User): Observable<Response<void>> {
    const requestBody: any = {
      username: model.username,
      password: model.password,
      email: model.email,
      role: model.role
    }
    const result: Observable<Response<void>> = this.httpClient.post<Response<void>>(`${environment.api_url}/users`, requestBody);
    return result;
  }

  public getUsers(): Observable<User[]>{
    let requestBody: {};
    return this.httpClient.get<User[]>(`${environment.api_url}/users`, requestBody);
  }


}
