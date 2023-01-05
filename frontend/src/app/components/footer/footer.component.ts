import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { IndexService } from 'src/app/services/index.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent {

  private footer: any;
  // Login
  private authentication: any;

  constructor (
    private _indexService: IndexService,
    private _authService: AuthService,
  ){
    this.authentication = this._authService;

    this._indexService.getData().subscribe(data => {
      this.footer = data.footer;
    })
  }

  // Login
  public get authService() {
    return this.authentication;
  } 

  // Logo Img
  public get logoImg(): string{
    return this.footer.logoImg;
  }
  public set logoImg(value: string){
    this.footer.logoImg = value;
  }
  
  // Logo Text
  public get text(): string{
    return this.footer.text;
  }
  public set text(value: string){
    this.footer.text = value;
  }
  
  // Icons
  public get icons(): any{
    return this.footer.icons;
  }
  public set icons(value: any){
    this.footer.icons = value;
  }

  // URL
  public get openUrl(): URL{
    return this.footer.icons.iconUrl;
  }

}
