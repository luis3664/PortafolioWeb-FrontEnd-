import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  public singPorfolio: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authService: AuthService,
  ){
    this.singPorfolio = this.formBuilder.group({
      username: ['',[Validators.required, Validators.minLength(4),Validators.maxLength(12)]],
      password: ['',[Validators.required, Validators.minLength(8)]],
    })
  }
  private login(){
    this.authService.login(this.username, this.password)
  }

  public onSend(event: Event) {
    event.preventDefault;
    
    if (this.singPorfolio.valid){
      console.log(event);
      this.login();
    }else{
      this.singPorfolio.markAllAsTouched();
    }

  }

  // Username
  public get username(): string {
    console.log(this.username)
    return this.username;
  }
  public set username(value:string) {
    this.username = value;
  }

  // Password
  public get password(): string {
    return this.password;
  }
  public set password(value: string) {
    this.password = value;
  }

}
