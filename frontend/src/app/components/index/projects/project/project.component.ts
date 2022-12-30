import { Component, Input } from '@angular/core';
import { IndexService } from 'src/app/services/index.service';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.css']
})
export class ProjectComponent {

  @Input('iProjects') interactor: any;

  constructor (
    private _indexService: IndexService,
  ){}

  // Title Project
  public get title(): string {
    return this._indexService.section5.projects[this.interactor].title;
  }
  public set title(value: string) {
    this._indexService.section5.projects[this.interactor].title = value;
  }
  
  // Text Project
  public get text(): string {
    return this._indexService.section5.projects[this.interactor].text;
  }
  public set text(value: string) {
    this._indexService.section5.projects[this.interactor].text = value;
  }
  
  // imgUrl Project
  public get imgUrl(): string {
    return this._indexService.section5.projects[this.interactor].imgUrl;
  }
  public set imgUrl(value: string) {
    this._indexService.section5.projects[this.interactor].imgUrl = value;
  }
  
  // imgName Project
  public get imgName(): string {
    return this._indexService.section5.projects[this.interactor].imgName;
  }
  public set imgName(value: string) {
    this._indexService.section5.projects[this.interactor].imgName = value;
  }

}
