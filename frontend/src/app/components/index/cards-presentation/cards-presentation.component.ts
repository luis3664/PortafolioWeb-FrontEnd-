import { Component } from '@angular/core';
import { IndexService } from 'src/app/services/index.service';

@Component({
  selector: 'app-cards-presentation',
  templateUrl: './cards-presentation.component.html',
  styleUrls: ['./cards-presentation.component.css']
})


export class CardsPresentationComponent {

  cards = this._indexService.section1.cards;

  constructor (private _indexService:IndexService) {}

  // Title Section
  public get titleCardsPresentation(): string {
    return this._indexService.section1.title;
  }
  public set titleCardsPresentation(value: string) {
    this._indexService.section1.title = value;
  }
}
