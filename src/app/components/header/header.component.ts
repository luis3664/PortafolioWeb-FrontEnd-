import { Component, inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Footer } from 'src/app/interfaces/Footer.interface';
import { Header } from 'src/app/interfaces/Header.interface';
import { ImgLogo } from 'src/app/interfaces/ImgLogo.interface';
import { Logo } from 'src/app/interfaces/Logo.interface';
import { AuthService } from 'src/app/services/auth.service';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})

export class HeaderComponent implements OnInit{

  // Items
  private header!: Header;
  private imgLogo!: ImgLogo;
  private logoCurrent!: any;
  private selectEdit!: number;
  private footer!: Footer;
  private indexFooter!: number;
  
  // Initializers
  private textHeader!: string;
  private logo!: Logo;
  private logos!: Logo[];
  private titleSec1: any;
  private titleSec2: any;
  private titleSec3: any;
  private titleSec4: any;
  private titleSec5: any;

  // Login
  private authentication: boolean = false;

  // Injection
  private _dataService = inject(DataService);
  private _authService = inject(AuthService);
  

  public displayLink: boolean = true;
  
  constructor () {
  }
  
  ngOnInit(): void {
    // Logos
    this._dataService.readLogoImg().subscribe(res => {
      // Items
      this.imgLogo = res[0];
      this.logos = this.imgLogo.logos;
      this.logoCurrent = this.logos[this.imgLogo.currentId];

      // Initializers
      this.logo = this.logoCurrent.url;
    })

    // Footer Logo
    this._dataService.readFooter().subscribe(res =>{
      this.footer = res[0];
      this.indexFooter = res[0].currentIndexLogo;
    })

    // Text Header
    this._dataService.readHeader().subscribe(header => {
      // Items
      this.header = header[0];
      this.setCurrentHeader(header[0]);

      // Initializers
      this.textHeader = this.header.text
    })

    // Menu
    this._dataService.readSections().subscribe(titles => {
      // Initializers
      this.titleSec1 = titles[0].title;
      this.titleSec2 = titles[1].title;
      this.titleSec3 = titles[2].title;
      this.titleSec4 = titles[3].title;
      this.titleSec5 = titles[4].title;
      // Login
      this.authentication = this._authService.logState;
    })

    // Identificator pathname
    if(window.location.pathname == '/login'){
      this.displayLink = false;
    }

  }

  // Form of Modal Editor
  formModule = new FormGroup({
    text: new FormControl('', Validators.required)
  })
  formLogo = new FormGroup({
    currentId: new FormControl(0, Validators.required),
    addLogo: new FormGroup({
      name: new FormControl(''),
      url: new FormControl(''),
    }),
    editLogo: new FormGroup({
      name: new FormControl(''),
      url: new FormControl(''),
    }),
  })

  // Get Header
  public get headerTitle(){
    return this._dataService.readHeader();
  }
  // Set Current Header
  private setCurrentHeader(header: any){
    this.formModule.patchValue(header);
  }

  // Login
  public get authenticator() {
    return this.authentication;
  }
  public logOut(){
    this._authService.logout();
  }

  // Logo Img
  public get logoImg(){
    return this.logo;
  }
  public get logosArray(){
    return this.logos;
  }

  public addLogo(){
    let logo: Logo = this.formLogo.getRawValue().addLogo;
    this.imgLogo.logos.push(logo);
    this._dataService.updateLogoImg(this.imgLogo);
  }

  public updateLogo(){
    let ref = this.formLogo.getRawValue().currentId as number;
    this.imgLogo.currentId = ref;
    this._dataService.updateLogoImg(this.imgLogo);
  }

  public editLogo(){
    let ref = this.formLogo.controls.editLogo.getRawValue();
    this.imgLogo.logos[this.selectEdit].name = ref.name;
    this.imgLogo.logos[this.selectEdit].url = ref.url;
    this._dataService.updateLogoImg(this.imgLogo);
  }

  public setEditLogo(){
    let ref = this.formLogo.getRawValue().currentId as number;
    if(ref == 0){
      alert("To maintain the aesthetics of the page, this is the only logo that cannot be deleted or edit.")
      this.formLogo.controls.editLogo.patchValue({name: "None", url: "None"})
    }else{
      this.selectEdit = ref;
      this.formLogo.controls.editLogo.patchValue(this.imgLogo.logos[ref])
    }
  }
  
  public deleteLogo(){
    let index = this.formLogo.getRawValue().currentId as number;
    if(index == 0){
      alert("To maintain the aesthetics of the page, this is the only logo that cannot be deleted or edit.")
    }else {
      if(this.imgLogo.currentId == index){
        this.imgLogo.currentId = 0;
      }
      if(this.indexFooter == index){
        this.indexFooter = 0;
      }
      if(index < this.imgLogo.currentId){
        this.imgLogo.currentId -= 1;
      }
      if(index < this.indexFooter){
        this.indexFooter -= 1;
      }
      this.footer.currentIndexLogo = this.indexFooter;
      this.imgLogo.logos.splice(index, 1);
      this._dataService.updateFooter(this.footer);
      this._dataService.updateLogoImg(this.imgLogo);
    }
  }
  
  // Logo Title
  public get logoTitle(){
    return this.textHeader;
  }
  public updateLogoTitle(){
    this._dataService.updateHeader((this.formModule.getRawValue()) as Header);
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