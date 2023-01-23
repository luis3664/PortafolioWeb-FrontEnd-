import { HtmlParser } from '@angular/compiler';
import { Component, Input, OnInit, inject } from '@angular/core';
import { Bar } from 'src/app/interfaces/Bar.interface';
import { Section4 } from 'src/app/interfaces/Section4.interface';
import { TopicSec4 } from 'src/app/interfaces/TopicSec4.interface';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-topics',
  templateUrl: './topics.component.html',
  styleUrls: ['./topics.component.css']
})
export class TopicsComponent implements OnInit {
  
  @Input('iSkills') interactor: any;

  // Items
  private section4!: Section4;
  
  // Initializers
  private titleTopic!: string;
  private barsSec4!: Bar[];
  private id: any;

  // Inject
  private _dataService = inject(DataService);


  constructor (){
  }

  ngOnInit(): void {
    this._dataService.readSections().subscribe(res =>{
      // Items
      this.section4 = res[3];
      
      // Initializers
      this.titleTopic = this.section4.topics[this.interactor].title as string;
      this.barsSec4 = this.section4.topics[this.interactor].bars;
      this.id = "id" + this.interactor;
    })
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
