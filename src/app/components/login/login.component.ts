import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  public singPorfolio: FormGroup;

  // Inject
  private _authService = inject(AuthService);
  private _formBuilder = inject(FormBuilder);
  private cookies = inject(CookieService);

  constructor(){
    if(this.remember()){
      this.singPorfolio = this._formBuilder.group({
        email: new FormControl(this.cookies.get("rememberMail"),[Validators.required, Validators.email]),
        password: new FormControl ('',[Validators.required, Validators.minLength(8)]),
        rememberMail: new FormControl (true)
      })
    }else{
      this.singPorfolio = this._formBuilder.group({
        email: new FormControl("",[Validators.required, Validators.email]),
        password: new FormControl ('',[Validators.required, Validators.minLength(8)]),
        rememberMail: new FormControl (false)
      })
    }
  }

  public onSend(event: Event) {
    event.preventDefault;

    if (this.singPorfolio.valid){
      let email = this.singPorfolio.getRawValue().email;
      let password = this.singPorfolio.getRawValue().password;

      if(this.singPorfolio.getRawValue().rememberMail){
        this.cookies.set("rememberMail", this.singPorfolio.getRawValue().email);
      }else{
        this.cookies.set("rememberMail", "");
      };

      this._authService.login(email, password);
    }else{
      this.singPorfolio.markAllAsTouched();
    }

  }

  private remember(): boolean{
    return (this.cookies.get("rememberMail") != "");
  }

}
