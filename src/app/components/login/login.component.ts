import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
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

  constructor(){
    this.singPorfolio = this._formBuilder.group({
      email: new FormControl('',[Validators.required, Validators.email]),
      password: new FormControl ('',[Validators.required, Validators.minLength(8)])
    })
  }

  public onSend(event: Event) {
    event.preventDefault;

    if (this.singPorfolio.valid){
      let email = this.singPorfolio.getRawValue().email;
      let password = this.singPorfolio.getRawValue().password;
      this._authService.login(email, password)
    }else{
      this.singPorfolio.markAllAsTouched();
    }

  }

}
