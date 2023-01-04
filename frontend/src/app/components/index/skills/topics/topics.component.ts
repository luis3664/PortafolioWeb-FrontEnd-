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
  private topics: any;

  constructor (
    private _indexService: IndexService,
  ){
    this._indexService.getData().subscribe(data => {
      this.topics = data.section4.topics;
    })
  }

  // Title the Topics
  public get title(): string {
    console.log(this.interactor);
    return this.topics[this.interactor].titleTopic;
  }
  public set title(value: string) {
    this.topics[this.interactor].titleTopic = value;
  }
  
  // Bars
  public get bars(): any {
    return this.topics[this.interactor].bars;
  }
  public set bars(value: any) {
    this.topics[this.interactor].bars = value;
  }

  // Id Topic
  public get ids(): string {
    return this.topics[this.interactor].id;
  }

}
