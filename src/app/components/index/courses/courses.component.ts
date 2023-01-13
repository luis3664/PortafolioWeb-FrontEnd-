import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { IndexService } from 'src/app/services/index.service';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.css']
})
export class CoursesComponent {

  private section3: any;

  private authentication: any;

  constructor (
    private _indexService: IndexService,
    private _authService: AuthService,
  ){
    this.authentication = this._authService;

    this._indexService.getData().subscribe(data => {
      this.section3 = data.section3;
    });
  }

  // Login
  public get authService() {
    return this.authentication;
  } 

  // Title Section
  public get title(): string {
    return this.section3.title;
  }
  public set title(value: string) {
    this.section3.title = value;
  }
  
  // Cards for ngFor
  public get cards(): string {
    return this.section3.courses;
  }
  
}