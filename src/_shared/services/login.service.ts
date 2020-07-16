import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LoginRequest } from '../messages/login-request.model';
import { Response } from './../models/Response';
import { environment } from 'src/environments/environment';
import { User } from './../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class LogInService {

  constructor(
    private httpClient: HttpClient,
  ) {
   }

  getUsers(): Observable<User[]>{
    let requestBody: {};
    return this.httpClient.get<User[]>(`${environment.api_url}/users`, requestBody);
  }


  logOut(): void {
    localStorage.removeItem('userId');
    localStorage.removeItem('userRole');
  }

}
