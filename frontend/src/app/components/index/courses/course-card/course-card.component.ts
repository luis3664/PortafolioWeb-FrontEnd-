import { Component, Input } from '@angular/core';
import { IndexService } from 'src/app/services/index.service';

@Component({
  selector: 'app-course-card',
  templateUrl: './course-card.component.html',
  styleUrls: ['./course-card.component.css']
})
export class CourseCardComponent {

  @Input() interaction: any;

  constructor (
    private _indexService:IndexService,
  ){}

  // Title Card
  public get title(): string {
    return this._indexService.section3.courses[this.interaction].titleCard;
  }
  public set title(value: string) {
    this._indexService.section3.courses[this.interaction].titleCard = value;
  }
  
  // Text Card
  public get text(): string {
    return this._indexService.section3.courses[this.interaction].textCard;
  }
  public set text(value: string) {
    this._indexService.section3.courses[this.interaction].textCard = value;
  }

  // Date Card
  public get date(): string {
    return this._indexService.section3.courses[this.interaction].dateCard;
  }
  public set date(value: string) {
    this._indexService.section3.courses[this.interaction].dateCard = value;
  }
  
  // ImgURL Card
  public get imgUrl(): string {
    return this._indexService.section3.courses[this.interaction].imgUrl;
  }
  public set imgUrl(value: string) {
    this._indexService.section3.courses[this.interaction].imgUrl = value;
  }
  
  // ImgName Card
  public get imgName(): string {
    return this._indexService.section3.courses[this.interaction].imgName;
  }
  public set imgName(value: string) {
    this._indexService.section3.courses[this.interaction].imgName = value;
  }
  
  // CourseUrl Card
  public get courseUrl(): string {
    return this._indexService.section3.courses[this.interaction].courseUrl;
  }
  public set courseUrl(value: string) {
    this._indexService.section3.courses[this.interaction].courseUrl = value;
  }

}
