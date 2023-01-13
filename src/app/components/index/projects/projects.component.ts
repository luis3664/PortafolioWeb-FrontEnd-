import { Component, Input } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { IndexService } from 'src/app/services/index.service';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css']
})
export class ProjectsComponent {

  private section5: any;
  // Login
  private authentication: any;

  constructor (
    private _indexService: IndexService,
    private _authService: AuthService,
  ){
    this.authentication = this._authService;

    this._indexService.getData().subscribe(data => {
      this.section5 = data.section5;
    });
  }

  // Login
  public get authService() {
    return this.authentication;
  } 

  // Title Section
  public get title(): string {
    return this.section5.title;
  }
  public set title(value: string) {
    this.section5.title = value;
  }

  // Items for ngFor
  public get items(): string {
    return this.section5.projects;
  }

}
