import { Component, Input, OnInit, inject } from '@angular/core';
import { Item } from 'src/app/interfaces/Item.interface';

@Component({
  selector: 'app-course-card',
  templateUrl: './course-card.component.html',
  styleUrls: ['./course-card.component.css']
})
export class CourseCardComponent implements OnInit {
  
  @Input() interaction: any;
  @Input() cardC!: Item;
  
  // Initializers
  private id: any;
  private titleCard!: string;
  private textCard!: string;
  private dateCard!: Date;
  private imgNameCard!: string;
  private imgUrlCard!: string;
  private certificateTitleCard!: string;
  private certificateUrlCard!: string;

  constructor (){
  }

  ngOnInit(): void {
    // Initializers
    this.id = "certificate" + this.interaction;
    this.titleCard = this.cardC.title;
    this.textCard = this.cardC.text;
    this.dateCard = this.cardC.certificate.date as Date;
    this.imgNameCard = this.cardC.imgAssigned[0].name;
    this.imgUrlCard = this.cardC.imgAssigned[0].url;
    this.certificateTitleCard = this.cardC.title;
    this.certificateUrlCard = this.cardC.certificate.urlCertificate;
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
  public get date(): Date {
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
