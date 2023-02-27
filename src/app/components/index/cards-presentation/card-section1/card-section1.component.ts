import { Component, inject, Input, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { Img } from 'src/app/interfaces/Img.interface';
import { Item } from 'src/app/interfaces/Item.interface';

@Component({
  selector: 'app-card-section1',
  templateUrl: './card-section1.component.html',
  styleUrls: ['./card-section1.component.css']
})
export class CardSection1Component implements OnInit {

  @Input() interaction: any;
  @Input() cardi: any;

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
    // Initializers
    this.titleCard = this.cardi.title;
    this.textBody = this.cardi.text;
    this.textEnd = this.cardi.textCard.text;
    this.img = this.cardi.imgAssigned;
    this.slideButton = this.cardi.imgAssigned.length > 1;
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
