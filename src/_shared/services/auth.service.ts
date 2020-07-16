import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  setToken(token: string): void {
    localStorage.setItem('token', token);
  }

  getToken(): string {
    const token: string = localStorage.getItem('token');
    return token;
  }

  isAuthenticated(): boolean {
    let result = true;
    const token: string = localStorage.getItem('token');

    if (token === null || token === undefined || token === '') {
      result = false;
    } else {
      const jwt: JwtHelperService = new JwtHelperService();
      if (jwt.isTokenExpired(localStorage.getItem('token'))) {
        result = false;
      }
    }

    return result;
  }

  getUser(): User {
    if (this.isAuthenticated()) {
      const jwt: JwtHelperService = new JwtHelperService();
      const decoded: object = jwt.decodeToken(localStorage.getItem('token'));
      const result: User = {
        id: decoded['nameid'],
        username: decoded['unique_name'],
        role: decoded['role'],
        password: '',
        email: decoded['email']
      };
      return result;
    }

    return null;
  }

}
