import { Component, inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CardSec3 } from 'src/app/interfaces/CardSec3.interface';
import { Section3 } from 'src/app/interfaces/Section3.interface';
import { AuthService } from 'src/app/services/auth.service';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.css']
})
export class CoursesComponent implements OnInit{

  // Items
  private section3!: Section3;
  
  // Initializers
  private titleSection!: string;
  private cardsSec3!: CardSec3[];

  // Inject
  private _dataService = inject(DataService);

  private authentication: any;

  constructor (
    private _authService: AuthService,
  ){
    this.authentication = this._authService;
  }

  ngOnInit(): void {
    this._dataService.readSections().subscribe(res => {
      // Items
      this.section3 = res[2];
      this.setCurrentTitle(this.section3);
      
      // Initializers
      this.titleSection = this.section3.title;
      this.cardsSec3 = this.section3.cards;
    })
  }

  formTitle = new FormGroup({
    title: new FormControl('', Validators.required)
  })
  formCards = new FormGroup({
    select: new FormControl(0),
    addCard: new FormGroup({
      title: new FormControl(''),
      text: new FormControl(''),
      date: new FormControl(''),
      imgName: new FormControl(''),
      imgUrl: new FormControl(''),
      certificateTitle: new FormControl(''),
      certificateUrl: new FormControl('')
    }),
    editCard: new FormGroup({
      title: new FormControl(''),
      text: new FormControl(''),
      date: new FormControl(''),
      imgName: new FormControl(''),
      imgUrl: new FormControl(''),
      certificateTitle: new FormControl(''),
      certificateUrl: new FormControl('')
    })
  })

  // Login
  public get authService() {
    return this.authentication;
  } 

  // Title Section
  public get title(): string {
    return this.titleSection;
  }
  private setCurrentTitle(sec3: Section3){
    this.formTitle.controls.title.patchValue(sec3.title);
  }
  public saveTitle(){
    this._dataService.updateSec3(this.formTitle.getRawValue());
  }
  
  // Cards
  public get cards(): CardSec3[] {
    return this.cardsSec3;
  }
  public addCard(){
    let card = this.formCards.getRawValue().addCard;
    this.section3.cards.push(card as CardSec3);
    this._dataService.updateSec3(this.section3);
  }
  public setEditCard(){
    let ref = this.formCards.getRawValue().select as number;
    let select = this.section3.cards[ref];
    this.formCards.controls.editCard.patchValue(select);
  }
  public editCard(){
    let ref = this.formCards.controls.select.getRawValue() as number;
    this.section3.cards[ref] = this.formCards.controls.editCard.getRawValue();
    this._dataService.updateSec3(this.section3);
  }
  public deleteCard() {
    let index = this.formCards.controls.select.getRawValue() as number;
    if(index == 0){
      alert("To maintain the aesthetics of the page, this card cannot be deleted.")
    }else{
      this.section3.cards.splice(index, 1);
      this._dataService.updateSec3(this.section3);
      this.formCards.controls.select.patchValue(0);
    }
  }
  
}