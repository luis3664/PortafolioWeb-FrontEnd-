import { Component } from '@angular/core';
import { IndexService } from 'src/app/services/index.service';

@Component({
  selector: 'app-cards-presentation',
  templateUrl: './cards-presentation.component.html',
  styleUrls: ['./cards-presentation.component.css']
})


export class CardsPresentationComponent {

  private section1: any;

  constructor (
    private _indexService:IndexService,
    ) {
      this._indexService.getData().subscribe(data => {
      this.section1 = data.section1;
    });
  }

  // Title Section
  public get titleSection(): string {
    return this.section1.title;
  }
  public set titleSection(value: string) {
    this.section1.title = value;
  }

  // Cards for ngFor
  public get cards(): any {
    return this.section1.cards;
  }
}
