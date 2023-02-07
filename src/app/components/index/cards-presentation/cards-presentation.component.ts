import { Component, inject, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { Section1 } from 'src/app/interfaces/Section1.interface';
import { AuthService } from 'src/app/services/auth.service';
import { DataService } from 'src/app/services/data.service';
import { Item } from 'src/app/interfaces/Item.interface';

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
  private cardsArray!: Array<Item>;

  // Login
  private authentication: boolean = false;

  private _dataService = inject(DataService);
  private _authService = inject(AuthService);

  constructor (){
  }
  
  ngOnInit() {
    this._dataService.readSections().subscribe(res =>{
      // Items
      this.section1 = res[0];
    });
    
    this._dataService.readSec1().subscribe(res => {
      // Items
      this.setCurrentTitle(res.title);

      // Initializers
      this.title = res.title;
      this.cardsArray = res.listItem;
      this.authentication = this._authService.logState;
    })

  }
  
  // Forms
  formModule = new FormGroup({
    title: new FormControl('', Validators.required)
  })
  formCards = new FormGroup({
    select: new FormControl(0),
    addCard: new FormGroup({
      title: new FormControl(''),
      textBody: new FormControl(''),
      textEnd: new FormControl(),
      img: new FormArray([new FormGroup({
        name: new FormControl(),
        url: new FormControl(),
      })])
    }),
    editCard: new FormGroup({
      title: new FormControl(),
      textBody: new FormControl(),
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
  private setCurrentTitle(title: string){
    this.formModule.controls.title.patchValue(title);
  }

  // Cards for ngFor
  public get cards(): any {
    return this.cardsArray;
  }

  // Title Section 1
  public saveTitle(){
  }

  // Cards Section 1 New
  public addCard(){
    
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

  public deleteImgAdd() {
    let ref = (this.formCards.controls.addCard.get('img') as FormArray).length - 1;
    if( ref > 0){
      (this.formCards.controls.addCard.get('img') as FormArray).removeAt(ref);
    }else{
      alert("At least one line is required");
    }
  }

  public get newImg() {
    return (this.formCards.controls.addCard.get('img') as FormArray).controls;
  }

  // Cards Section 1 Edit  
  public setEditCard(){
    (this.formCards.controls.editCard.get('img') as FormArray).clear();
    let ref = this.formCards.getRawValue().select as number;
    let select = this.cardsArray[ref];
    this.formCards.controls.editCard.controls.title.patchValue(select.title);
    this.formCards.controls.editCard.controls.textBody.patchValue(select.text);
    this.formCards.controls.editCard.controls.textEnd.patchValue(select.textCard.text);
  
    select.imgAssigned.map((res: any) => {
      let editForm = new FormGroup({
        name: new FormControl(res.name),
        url: new FormControl(res.url),
      });
      (this.formCards.controls.editCard.get('img') as FormArray).push(editForm);
    });
  }

  public editCard(){
    let ref = this.formCards.controls.select.getRawValue() as number;
    let cardEdit: Item = {
      id: this.cardsArray[ref].id,
      title: this.formCards.controls.editCard.getRawValue().title,
      text: this.formCards.controls.editCard.getRawValue().textBody,
      certificate: this.cardsArray[ref].certificate,
      imgAssigned: this.formCards.controls.editCard.getRawValue().img,
      iconAssigned: this.cardsArray[ref].iconAssigned,
      textCard: {
        id: this.cardsArray[ref].textCard.id,
        text: this.formCards.controls.editCard.getRawValue().textEnd}
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

  public deleteImgEdit() {
    let ref = (this.formCards.controls.editCard.get('img') as FormArray).length - 1;
    if( ref > 0){
      (this.formCards.controls.editCard.get('img') as FormArray).removeAt(ref);
    }else{
      alert("At least one line is required");
    }
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
