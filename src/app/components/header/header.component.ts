import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { IndexService } from 'src/app/services/index.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})

export class HeaderComponent {

  // Logo
  private logo: any;
  // Tittles Menu
  private titleSec1: any;
  private titleSec2: any;
  private titleSec3: any;
  private titleSec4: any;
  private titleSec5: any;
  // Login
  private authentication: any;

  displayLink: boolean = true;
  
  constructor (
    private _indexService: IndexService,
    private _authService: AuthService,
  ) {
    this.authentication = this._authService;

    this._indexService.getData().subscribe(data => {
      this.logo = data.header;
      this.titleSec1 = data.section1.title;
      this.titleSec2 = data.section2.title;
      this.titleSec3 = data.section3.title;
      this.titleSec4 = data.section4.title;
      this.titleSec5 = data.section5.title;
    })

    if(window.location.pathname == '/login'){
      this.displayLink = false;
    }
  }

  // Login
  public get authService() {
    return this.authentication;
  } 

  // Logo Img
  public get logoImg(){
    return this.logo.logoImg;
  }
  public set logoImg(value: string){
    this.logo.logoImg = value;
  }

  // Logo Title
  public get logoTitle(){
    return this.logo.logoTitle;
  }
  public set logoTitle(value: string){
    this.logo.logoTitle = value;
  }

  // Titles Menu
  public get titlePresentation(){
    return this.titleSec1;
  }
  public get titleWork(){
    return this.titleSec2;
  }
  public get titleCourses(){
    return this.titleSec3;
  }
  public get titleSkills(){
    return this.titleSec4;
  }
  public get titleProjects(){
    return this.titleSec5;
  }

}