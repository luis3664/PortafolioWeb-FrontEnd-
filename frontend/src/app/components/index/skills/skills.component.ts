import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { IndexService } from 'src/app/services/index.service';

@Component({
  selector: 'app-skills',
  templateUrl: './skills.component.html',
  styleUrls: ['./skills.component.css']
})

export class SkillsComponent {

  private section4: any;
  // Login
  private authentication: any;

  constructor (
    private _indexService: IndexService,
    private _authService: AuthService,
  ){
    this.authentication = this._authService;

    this._indexService.getData().subscribe(data => {
      this.section4 = data.section4;
    })
  }

  // Login
  public get authService() {
    return this.authentication;
  } 

  // Title Section
  public get title(): string {
    return this.section4.title;
  }
  public set title(value: string) {
    this.section4.title = value;
  }

  // Topics for ngFor
  public get topics(): any {
    return this.section4.topics;
  }

}
