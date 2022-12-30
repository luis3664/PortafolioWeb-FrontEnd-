import { HtmlParser } from '@angular/compiler';
import { Component, Input } from '@angular/core';
import { IndexService } from 'src/app/services/index.service';

@Component({
  selector: 'app-topics',
  templateUrl: './topics.component.html',
  styleUrls: ['./topics.component.css']
})
export class TopicsComponent {
  
  @Input('iSkills') interactor: any;

  svgImg : any;

  constructor (
    private _indexService: IndexService,
  ){}

  // Title the Topics
  public get title(): string {
    return this._indexService.section4.topics[this.interactor].titleTopic;
  }
  public set title(value: string) {
    this._indexService.section4.topics[this.interactor].titleTopic = value;
  }
  
  // Bars
  public get bars(): any {
    return this._indexService.section4.topics[this.interactor].bars;
  }
  public set bars(value: any) {
    this._indexService.section4.topics[this.interactor].bars = value;
  }

}
