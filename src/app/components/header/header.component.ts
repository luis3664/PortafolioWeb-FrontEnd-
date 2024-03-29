import { Component, inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Section } from 'src/app/interfaces/Section.interface';
import { AuthService } from 'src/app/services/auth.service';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})

export class HeaderComponent implements OnInit{

  // Items
  private header!: Section;
  
  // Initializers
  private textHeader!: string;
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
    // Text Header
    this._dataService.readHeader().subscribe(res => {
      // Items
      this.header = res;
      this.setCurrentHeader(res.title);

      // Initializers
      this.textHeader = res.title
      this.authentication = this._authService.logState;
    })

    // Menu
    this._dataService.readAllSec().subscribe(secs => {
      // Initializers
      this.titleSec1 = secs[0].title;
      this.titleSec2 = secs[1].title;
      this.titleSec3 = secs[2].title;
      this.titleSec4 = secs[3].title;
      this.titleSec5 = secs[4].title;
    })

    // Identificator pathname
    if(window.location.pathname == '/login' || window.location.pathname == '/'){
      this.displayLink = false;
    }

  }

  // Form of Modal Editor
  formModule = new FormGroup({
    text: new FormControl('', Validators.required)
  })

  // Set Current Header
  private setCurrentHeader(header: any){
    this.formModule.controls.text.patchValue(header);
  }

  // Login
  public get authenticator() {
    return this.authentication;
  }
  public logOut(){
    this._authService.logout();
  }
  
  // Logo Title
  public get logoTitle(){
    return this.textHeader;
  }
  public updateLogoTitle(){
    let item: Section =  this.header;
    item.title = this.formModule.controls.text.getRawValue() as string;
    console.log(this.textHeader)
    this._dataService.updateHeaderTitle(item).subscribe(res =>{
      this.textHeader = item.title;
      console.log(this.textHeader)
    });
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