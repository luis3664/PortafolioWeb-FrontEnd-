import { Component } from '@angular/core';
import { IndexService } from 'src/app/services/index.service';

@Component({
  selector: 'app-skills',
  templateUrl: './skills.component.html',
  styleUrls: ['./skills.component.css']
})

export class SkillsComponent {

  topics: any;

  constructor (
    private _indexService: IndexService,
  ){
    this.topics = _indexService.section4.topics;
  }

  // Title Section
  public get title(): string {
    return this._indexService.section4.titleSkill;
  }
  public set title(value: string) {
    this._indexService.section4.titleSkill = value;
  }

}
