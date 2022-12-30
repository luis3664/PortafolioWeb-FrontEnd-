import { Component, Input } from '@angular/core';
import { IndexService } from 'src/app/services/index.service';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css']
})
export class ProjectsComponent {

  items = this._indexService.section5.projects;
  public interactor: any;

  constructor (
    private _indexService: IndexService,
  ){}


  // Title Section
  public get title(): string {
    return this._indexService.section5.title;
  }
  public set title(value: string) {
    this._indexService.section5.title = value;
  }

}
