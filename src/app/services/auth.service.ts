import { Injectable, inject } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/compat/auth';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private token: string = '';

  private _firebase = inject(AngularFireAuth);
  private router = inject(Router);

  constructor() {
  }

  public login(email:string, password: string) {

    this._firebase.signInWithEmailAndPassword(email, password).then(result =>{
      result.user?.getIdToken().then(token =>{
        this.token = token;
        this.router.navigate(['/']);
      })
    })

    // this.http.post(this.uri + '/authenticate', {username: username, password: password}).subscribe((resp: any) => {
    //   this.router.navigate(['index']);

    //   localStorage.setItem('auth_token', resp.token);
    // })
  }

  public getIdToken(): string{
    return this.token;
  }

  public logout() {
    this._firebase.signOut().then(() =>{
      this.token='';
      this.router.navigate(['/']);
    });
  }

  public get logState(): boolean {
    return (this.token != '');
  }

}