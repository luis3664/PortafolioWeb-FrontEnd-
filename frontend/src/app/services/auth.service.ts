import { Injectable } from '@angular/core';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  uri = 'http://localhost:4200/';
  token: any;

  constructor(
    private http: HttpClient,
    private router: Router,
  ) { }

  login(username:string, password: string) {
    this.http.post(this.uri + '/authenticate', {username: username, password: password}).subscribe((resp: any) => {
      this.router.navigate(['index']);

      localStorage.setItem('auth_token', resp.token);
    })
  }

  logout() {
    localStorage.removeItem('token');
  }

  public get logIn(): boolean {
    return (localStorage.getItem('token') !== null);
  }

}