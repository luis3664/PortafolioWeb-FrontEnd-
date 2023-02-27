import { Injectable, inject } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { CookieService } from 'ngx-cookie-service';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  // Inject
  private _firebase = inject(AngularFireAuth);
  private router = inject(Router);
  private cookies = inject(CookieService);

  constructor() {
  }

  public login(email:string, password: string) {

    let timer: Date = new Date();
    timer.setMinutes( timer.getMinutes() + 60);
    
    this._firebase.signInWithEmailAndPassword(email, password).then(result =>{
      alert("Valid Entry");
      result.user?.getIdToken().then(token =>{
        // localStorage.setItem("auth_token", token);
        this.cookies.set("auth_token", token, timer);
        window.location.reload();
        this.router.navigate(['/']);
      })
    }).catch(err =>{
      alert("Invalid Email and Password combination.")
    });

  }

  public getIdToken(): string{
    return this.cookies.get("auth_token");
    // return localStorage.getItem("auth_token") as string;
  }

  public logout() {
    this._firebase.signOut().then(() =>{
      this.cookies.set("auth_token", "");
      // localStorage.removeItem("auth_token");
      this.router.navigate(['/index']);
      window.location.reload();
    });
  }

  public get logState(): boolean {
    // let token: string = localStorage.getItem("auth_token") as string;
    // return (token != undefined);
    let token: string = this.cookies.get("auth_token");
    return (token != "");
  }

}