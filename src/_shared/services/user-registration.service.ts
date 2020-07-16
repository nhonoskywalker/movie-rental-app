import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { UserRegistrationRequest } from '../messages/user-registration-request.model';
import { environment } from 'src/environments/environment';
import { Response } from './../models/Response';
import { User } from '../models/user.model';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class UserRegistrationService {

  constructor(
    private httpClient: HttpClient,
    private snackBar: MatSnackBar,
  ) { }

  public async register(userRegistrationRequest: UserRegistrationRequest): Promise<Observable<Response<void>>> {
    const requestBody: any = {
      username: userRegistrationRequest.username,
      password: userRegistrationRequest.password,
      email: userRegistrationRequest.email,
      role: userRegistrationRequest.role
    }
    let username: any;
    let email: any;

    let users = await this.getUsers().toPromise();

    username = users.find(user => user.username === userRegistrationRequest.username);
    email = users.find(user => user.email === userRegistrationRequest.email);

    if (email) {
      this.snackBar.open("Email already used.", null, { duration: 2000 });
    }
    else if (username) {
      this.snackBar.open("Username already used.", null, { duration: 2000 });
    } else {
      return this.httpClient.post<Response<void>>(`${environment.api_url}/users`, requestBody);
    }


    return null;
  }

  private getUsers(): Observable<User[]> {
    let requestBody: {};
    return this.httpClient.get<User[]>(`${environment.api_url}/users`, requestBody);
  }
}
