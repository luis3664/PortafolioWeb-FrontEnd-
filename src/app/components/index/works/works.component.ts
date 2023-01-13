import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { IndexService } from 'src/app/services/index.service';

@Component({
  selector: 'app-works',
  templateUrl: './works.component.html',
  styleUrls: ['./works.component.css']
})
export class WorksComponent {

  private section2: any;
  // Login
  private authentication: any;

  constructor (
    private _indexService: IndexService,
    private _authService: AuthService,
  ){
    this.authentication = this._authService;

    this._indexService.getData().subscribe(data => {
      this.section2 = data.section2;
    })
  }
  
  // Login
  public get authService() {
    return this.authentication;
  } 

  // Title Section
  public get title(): string {
    return this.section2.title;
  }
  public set title(value: string) {
    this.section2.title = value;
  }
  
  // Items for ngFor
  public get items(): string {
    return this.section2.works;
  }
  
}
