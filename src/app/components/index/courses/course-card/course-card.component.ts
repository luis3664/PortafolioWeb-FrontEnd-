import { Component, Input, OnInit, inject } from '@angular/core';
import { CardSec3 } from 'src/app/interfaces/CardSec3.interface';
import { Section3 } from 'src/app/interfaces/Section3.interface';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-course-card',
  templateUrl: './course-card.component.html',
  styleUrls: ['./course-card.component.css']
})
export class CourseCardComponent implements OnInit {
  
  @Input() interaction: any;

  // // Items
  private section3!: Section3;
  private cardsSec3!: CardSec3[];
  
  // // Initializers
  private id: any;
  private titleCard!: string;
  private textCard!: string;
  private dateCard!: string;
  private imgNameCard!: string;
  private imgUrlCard!: string;
  private certificateTitleCard!: string;
  private certificateUrlCard!: string;

  // // Inject
  private _dataService = inject(DataService);

  constructor (){
  }

  ngOnInit(): void {
    this._dataService.readSections().subscribe(res =>{
      // Items
      this.section3 = res[2];
      this.cardsSec3 = this.section3.cards;

      // Initializers
      this.id = "certificate" + this.interaction;
      this.titleCard = this.cardsSec3[this.interaction].title as string;
      this.textCard = this.cardsSec3[this.interaction].text as string;
      this.dateCard = this.cardsSec3[this.interaction].date as string;
      this.imgNameCard = this.cardsSec3[this.interaction].imgName as string;
      this.imgUrlCard = this.cardsSec3[this.interaction].imgUrl as string;
      this.certificateTitleCard = this.cardsSec3[this.interaction].certificateTitle as string;
      this.certificateUrlCard = this.cardsSec3[this.interaction].certificateUrl as string;
    })
  }

  // Ids Modal
  public get ids(){
    return this.id
  }

  // Title Card
  public get title(): string {
    return this.titleCard;
  }
  
  // Text Card
  public get text(): string {
    return this.textCard;
  }

  // Date Card
  public get date(): string {
    return this.dateCard;
  }
  
  // ImgURL Card
  public get imgUrl(): string {
    return this.imgUrlCard;
  }
  
  // ImgName Card
  public get imgName(): string {
    return this.imgNameCard;
  }
  
  // CourseUrl Card
  public get courseUrl(): string {
    return this.certificateUrlCard;
  }

  // CourseName Card
  public get courseTitle(): string {
    return this.certificateTitleCard;
  }

}
