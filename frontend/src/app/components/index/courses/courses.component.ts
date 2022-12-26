import { Component } from '@angular/core';
import { IndexService } from 'src/app/services/index.service';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.css']
})
export class CoursesComponent {

  cards = this._indexService.section3.courses;

  constructor (
    private _indexService: IndexService, 
  ){}

  // Title Section
  public get title(): string {
    return this._indexService.section3.title;
  }
  public set title(value: string) {
    this._indexService.section3.title = value;
  }

}