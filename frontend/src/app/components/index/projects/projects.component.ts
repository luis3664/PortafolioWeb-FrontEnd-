import { Component, Input } from '@angular/core';
import { IndexService } from 'src/app/services/index.service';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css']
})
export class ProjectsComponent {

  private section5: any;

  constructor (
    private _indexService: IndexService,
  ){
    this._indexService.getData().subscribe(data => {
      this.section5 = data.section5;
    })
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
