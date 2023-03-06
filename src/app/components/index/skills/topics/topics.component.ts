import { Component, Input, OnInit, inject } from '@angular/core';
import { Bar } from 'src/app/interfaces/Bar.interface';

@Component({
  selector: 'app-topics',
  templateUrl: './topics.component.html',
  styleUrls: ['./topics.component.css']
})
export class TopicsComponent implements OnInit {
  
  @Input('iSkills') interactor: any;
  @Input('topicList') topics: any;
  
  // Initializers
  private titleTopic!: string;
  private barsSec4!: Bar[];
  private id: any;


  constructor (){
  }

  ngOnInit(): void {
    // Initializers
    this.titleTopic = this.topics.title as string;
    this.barsSec4 = this.topics.listBar;
    this.id = "id" + this.interactor;
  }

  // Title the Topics
  public get title(): string {
    return this.titleTopic;
  }
  
  // Bars
  public get bars(): any {
    return this.barsSec4;
  }

  // Id Topic
  public get ids(): string {
    return this.id;
  }

}
