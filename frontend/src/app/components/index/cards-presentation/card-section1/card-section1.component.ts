import { Component, Input } from '@angular/core';
import { IndexService } from 'src/app/services/index.service';

@Component({
  selector: 'app-card-section1',
  templateUrl: './card-section1.component.html',
  styleUrls: ['./card-section1.component.css']
})
export class CardSection1Component {

  constructor(
    private _indexService: IndexService,
  ){}

  @Input() interaction: any;

  
  // Title Card
  public get title(): string {
    return this._indexService.section1.cards[this.interaction].title;
  }
  public set title(value: string) {
    this._indexService.section1.cards[this.interaction].title = value;
  }
  
  // Text1 Card
  public get text1(): string {
    return this._indexService.section1.cards[this.interaction].text1;
  }
  public set text1(value: string) {
    this._indexService.section1.cards[this.interaction].text1 = value;
  }

  // Text2 Card
  public get text2(): string {
    return this._indexService.section1.cards[this.interaction].text2;
  }
  public set text2(value: string) {
    this._indexService.section1.cards[this.interaction].text2 = value;
  }
  
  // ImgURL Card
  public get imgUrl(): string {
    return this._indexService.section1.cards[this.interaction].imgUrl;
  }
  public set imgUrl(value: string) {
    this._indexService.section1.cards[this.interaction].imgUrl = value;
  }
  
  // ImgURL Card
  public get imgName(): string {
    return this._indexService.section1.cards[this.interaction].imgName;
  }
  public set imgName(value: string) {
    this._indexService.section1.cards[this.interaction].imgName = value;
  }
}
