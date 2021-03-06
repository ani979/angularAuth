import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private BASE_URL: string = 'http://flaskpoc.us-east-1.elasticbeanstalk.com';
  private headers: Headers = new Headers({'Content-Type': 'application/json'});
  constructor(private http: Http) {}
  login(user: User): Promise<any> {
    let loginUrl: string = `${this.BASE_URL}/login`;
    return this.http.post(loginUrl, user, {headers: this.headers}).toPromise();
  }


  register(user: User): Promise<any> {
    let registerUrl: string = `${this.BASE_URL}/register`;
    return this.http.post(registerUrl, user, {headers: this.headers}).toPromise();
  }

  ensureAuthenticated(token): Promise<any> {
    console.log(" am i here " + token)
    let authenticationUrl: string = `${this.BASE_URL}/status`;
    let headers: Headers = new Headers({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    });
    return this.http.get(authenticationUrl, {headers: this.headers}).toPromise();
  }


  logout(user: User): Promise<any> {
    let logoutUrl: string = `${this.BASE_URL}/logout`;
    return this.http.post(logoutUrl, user, {headers: this.headers}).toPromise();
  }
}
