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
    this._dataService.readSections().subscribe(res =>{
      // Items
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
      textEnd: new FormControl(),
      img: new FormArray([new FormGroup({
        name: new FormControl(),
        url: new FormControl(),
      })])
    }),
    editCard: new FormGroup({
      title: new FormControl(),
      textBody: new FormArray([]),
      textEnd: new FormControl(),
      img: new FormArray([])
    }),
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

  public addImgAdd() {
    let ref = (this.formCards.controls.addCard.get('img') as FormArray).length;
    if(ref < 3){
      (this.formCards.controls.addCard.get('img') as FormArray).push(
        new FormGroup({
          name: new FormControl(),
          url: new FormControl()
        })
      );
    }else{
      alert("Maximum 3 lines");
    }
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

  public deleteImgAdd() {
    let ref = (this.formCards.controls.addCard.get('img') as FormArray).length - 1;
    if( ref > 0){
      (this.formCards.controls.addCard.get('img') as FormArray).removeAt(ref);
    }else{
      alert("At least one line is required");
    }
  }

  public get newTexts() {
    return (this.formCards.controls.addCard.get('textBody') as FormArray).controls;
  }
  public get newImg() {
    return (this.formCards.controls.addCard.get('img') as FormArray).controls;
  }

  // Cards Section 1 Edit  
  public setEditCard(){
    (this.formCards.controls.editCard.get('textBody') as FormArray).clear();
    (this.formCards.controls.editCard.get('img') as FormArray).clear();
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
    select.img.map((res: any) => {
      let editForm = new FormGroup({
        name: new FormControl(res.name),
        url: new FormControl(res.url),
      });
      (this.formCards.controls.editCard.get('img') as FormArray).push(editForm);
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

  public addImgEdit() {
    let ref = (this.formCards.controls.editCard.get('img') as FormArray).length;
    if(ref < 3){
      (this.formCards.controls.editCard.get('img') as FormArray).push(
        new FormGroup({
          name: new FormControl(),
          url: new FormControl()
        })
      );
    }else{
      alert("Maximum 3 image");
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

  public deleteImgEdit() {
    let ref = (this.formCards.controls.editCard.get('img') as FormArray).length - 1;
    if( ref > 0){
      (this.formCards.controls.editCard.get('img') as FormArray).removeAt(ref);
    }else{
      alert("At least one line is required");
    }
  }
  
  public get editTexts() {
    return (this.formCards.controls.editCard.get('textBody') as FormArray).controls;
  }
  public get editImg() {
    return (this.formCards.controls.editCard.get('img') as FormArray).controls;
  }

  // Cards Section 1 Delete
  public deleteCard() {
    let index = this.formCards.controls.select.getRawValue() as number;
    if(index <= 1){
      alert("To maintain the aesthetics of the page, this card cannot be deleted.")
    }else{
      this.section1.cards.splice(index, 1);
      this._dataService.updateSec1(this.section1);
      this.formCards.controls.select.patchValue(0);
    }
  }

}
