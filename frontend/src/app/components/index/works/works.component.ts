import { Component } from '@angular/core';
import { IndexService } from 'src/app/services/index.service';

@Component({
  selector: 'app-works',
  templateUrl: './works.component.html',
  styleUrls: ['./works.component.css']
})
export class WorksComponent {

  items = this._indexService.section2.works;

  constructor (
    private _indexService: IndexService,
  ){}

  // Title Section
  public get title(): string {
    return this._indexService.section2.title;
  }
  public set title(value: string) {
    this._indexService.section2.title = value;
  }

}
