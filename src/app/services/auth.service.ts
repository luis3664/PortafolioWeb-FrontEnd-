import { Injectable, inject } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/compat/auth';


@Injectable({
  providedIn: 'root'
})
export class AuthService {


  private _firebase = inject(AngularFireAuth);
  private router = inject(Router);

  constructor() {
  }

  public login(email:string, password: string) {

    this._firebase.signInWithEmailAndPassword(email, password).then(result =>{
      result.user?.getIdToken().then(token =>{
        localStorage.setItem("auth_token", token);
        this.router.navigate(['/']);
      })
    })

  }

  public getIdToken(): string{
    return localStorage.getItem("auth_token") as string;
  }

  public logout() {
    this._firebase.signOut().then(() =>{
      localStorage.removeItem("auth_token");
      this.router.navigate(['/index']);
      window.location.reload();
    });
  }

  public get logState(): boolean {
    let token: string = localStorage.getItem("auth_token") as string;
    return (token != undefined);
  }

}