import { Component, inject, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { Section1 } from 'src/app/interfaces/Section1.interface';
import { CardSec1 } from 'src/app/interfaces/CardSec1.interface';
import { AuthService } from 'src/app/services/auth.service';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-cards-presentation',
  templateUrl: './cards-presentation.component.html',
  styleUrls: ['./cards-presentation.component.css']
})


export class CardsPresentationComponent implements OnInit {

  // Items
  private section1!: Section1;
  private selectEdit!: number

  // Initializers
  private title!: string;
  private cardsArray!: Array<CardSec1>;

  // Login
  private authentication: any;

  private _dataService = inject(DataService);

  constructor (
    private _authService: AuthService, 
    ) {
      this.authentication = this._authService;
  }
  
  ngOnInit() {
    this._dataService.readSec1().subscribe(res =>{
      // items
      this.section1 = res[0];
      this.setCurrentTitle(res[0]);

      // Initializers
      this.title = this.section1.title;
      this.cardsArray = this.section1.cards;
    });

  }
  // Forms
  formModule = new FormGroup({
    title: new FormControl('', Validators.required)
  })
  formCards = new FormGroup({
    select: new FormControl(0),
    addCard: new FormGroup({
      title: new FormControl(''),
      textBody: new FormArray([new FormGroup({
        text: new FormControl()
      })]),
      textEnd: new FormControl()
    }),
    editCard: new FormGroup({
      title: new FormControl(),
      textBody: new FormArray([]),
      textEnd: new FormControl()
    }),
    addImg: new FormGroup({
      name: new FormControl(),
      url: new FormControl()
    }),
    editImg: new FormGroup({
      name: new FormControl(),
      url: new FormControl()
    })
  })

  // Login
  public get authService() {
    return this.authentication;
  } 

  // Title Section
  public get titleSection(): string {
    return this.title;
  }
  private setCurrentTitle(sec1: Section1){
    this.formModule.controls.title.patchValue(sec1.title);
  }

  // Cards for ngFor
  public get cards(): any {
    return this.cardsArray;
  }

  // Title Section 1
  public saveTitle(){
    this._dataService.updateSec1(this.formModule.getRawValue());
  }

  // Cards Section 1 New
  public addCard(){
    let card: CardSec1 = this.formCards.getRawValue().addCard as CardSec1;
    this.section1.cards.push(card);
    this._dataService.updateSec1(this.section1);
  }

  public addLineText() {
    let ref = (this.formCards.controls.addCard.get('textBody') as FormArray).length;
    if(ref < 5){
      (this.formCards.controls.addCard.get('textBody') as FormArray).push(
        new FormGroup({
          text: new FormControl()
        })
      );
    }else{
      alert("Maximum 5 lines");
    }
  }

  public deleteLineText() {
    let ref = (this.formCards.controls.addCard.get('textBody') as FormArray).length - 1;
    if( ref > 0){
      (this.formCards.controls.addCard.get('textBody') as FormArray).removeAt(ref);
    }else{
      alert("At least one line is required");
    }
  }

  public get newTexts() {
    return (this.formCards.controls.addCard.get('textBody') as FormArray).controls;
  }

  // Cards Section 1 Edit  
  public setEditCard(){
    (this.formCards.controls.editCard.get('textBody') as FormArray).clear();
    let ref = this.formCards.getRawValue().select as number;
    let select = this.section1.cards[ref];
    this.formCards.controls.editCard.controls.title.patchValue(select.title);
    this.formCards.controls.editCard.controls.textEnd.patchValue(select.textEnd);
    
    select.textBody.map((res: any) => {
      let editForm = new FormGroup({
        text: new FormControl(res.text),
      });
      (this.formCards.controls.editCard.get('textBody') as FormArray).push(editForm);
    });
  }

  public editCard(){
    let ref = this.formCards.controls.select.getRawValue() as number;
    this.section1.cards[ref] = this.formCards.controls.editCard.getRawValue();
    this._dataService.updateSec1(this.section1);
  }

  public addLineEdit() {
    let ref = (this.formCards.controls.editCard.get('textBody') as FormArray).length;
    if(ref < 5){
      (this.formCards.controls.editCard.get('textBody') as FormArray).push(
        new FormGroup({
          text: new FormControl()
        })
      );
    }else{
      alert("Maximum 5 lines");
    }
  }

  public deleteLineEdit() {
    let ref = (this.formCards.controls.editCard.get('textBody') as FormArray).length - 1;
    if( ref > 0){
      (this.formCards.controls.editCard.get('textBody') as FormArray).removeAt(ref);
    }else{
      alert("At least one line is required");
    }
  }

  public get editTexts() {
    return (this.formCards.controls.editCard.get('textBody') as FormArray).controls;
  }

  // Cards Section 1 Delete
  public deleteCard() {
    let index = this.formCards.controls.select.getRawValue() as number;
    this.section1.cards.splice(index, 1);
    this._dataService.updateLogoImg(this.section1);
  }

  
  // Cards Section 1 Imagen Card

}
