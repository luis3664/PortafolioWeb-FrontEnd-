import { Component, inject, Input, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { CardSec1 } from 'src/app/interfaces/CardSec1.interface';
import { Img } from 'src/app/interfaces/Img.interface';

@Component({
  selector: 'app-card-section1',
  templateUrl: './card-section1.component.html',
  styleUrls: ['./card-section1.component.css']
})
export class CardSection1Component implements OnInit {

  @Input() interaction: any;

  // Items
  private card!: CardSec1;

  // Initializers
  private titleCard!: string;
  private textBody!: Array<any>;
  private textEnd!: string;
  private img!: Array<Img>;

  // Inject
  private _dataService = inject(DataService);

  constructor(){
  }

  ngOnInit(){
    this._dataService.readSections().subscribe(res =>{
      // Items
      this.card = res[0].cards[this.interaction];

      // Initializers
      this.titleCard = this.card.title;
      this.textBody = this.card.textBody;
      this.textEnd = this.card.textEnd;
      this.img = this.card.img;

      console.log(this.img);
    });
  }
  
  // Title Card
  public get title(): string {
    return this.titleCard;
  }
  
  // Texts Body Card
  public get texts(): Array<any> {
    return this.textBody;
  }

  // Text End Card
  public get text2(): string {
    return this.textEnd;
  }
  
  // Image Card
  public get imgs(): Array<any> {
    return this.img;
  }
  
}
