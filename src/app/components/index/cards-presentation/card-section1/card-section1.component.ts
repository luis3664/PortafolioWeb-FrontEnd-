import { Component, inject, Input, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { Img } from 'src/app/interfaces/Img.interface';
import { Item } from 'src/app/interfaces/Item';

@Component({
  selector: 'app-card-section1',
  templateUrl: './card-section1.component.html',
  styleUrls: ['./card-section1.component.css']
})
export class CardSection1Component implements OnInit {

  @Input() interaction: any;

  // Items
  private card!: Item;

  // Initializers
  private titleCard!: string;
  private textBody!: string;
  private textEnd!: string;
  private img!: Array<Img>;
  private slideButton!: Boolean;

  // Inject
  private _dataService = inject(DataService);

  constructor(){
  }

  ngOnInit(){
    this._dataService.readSec1().subscribe(res =>{
      // Items
      this.card = res.listItem[this.interaction];

      // Initializers
      this.titleCard = this.card.title;
      this.textBody = this.card.text;
      this.textEnd = this.card.textCard.text;
      this.img = this.card.imgAssigned;
      this.slideButton = this.card.imgAssigned.length > 1;
    })
  }
  
  // Title Card
  public get title(): string {
    return this.titleCard;
  }
  
  // Texts Body Card
  public get texts(): string {
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

  // Slide Buttons
  public get buttons(): Boolean {
    return this.slideButton;
  }
  
}
