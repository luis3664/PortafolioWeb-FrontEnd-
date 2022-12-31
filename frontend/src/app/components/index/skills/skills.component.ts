import { Component } from '@angular/core';
import { IndexService } from 'src/app/services/index.service';

@Component({
  selector: 'app-skills',
  templateUrl: './skills.component.html',
  styleUrls: ['./skills.component.css']
})

export class SkillsComponent {

  private section4: any;

  constructor (
    private _indexService: IndexService,
  ){
    this._indexService.getData().subscribe(data => {
      this.section4 = data.section4;
    })
  }

  // Title Section
  public get title(): string {
    return this.section4.titleSkill;
  }
  public set title(value: string) {
    this.section4.titleSkill = value;
  }

  // Topics for ngFor
  public get topics(): any {
    return this.section4.topics;
  }

}
