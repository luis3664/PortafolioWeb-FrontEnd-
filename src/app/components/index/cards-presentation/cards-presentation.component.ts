import { Component, inject, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { DataService } from 'src/app/services/data.service';
import { Item } from 'src/app/interfaces/Item.interface';
import { Section } from 'src/app/interfaces/Section.interface';
import { Img } from 'src/app/interfaces/Img.interface';
import { Text } from 'src/app/interfaces/Text.interface';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-cards-presentation',
  templateUrl: './cards-presentation.component.html',
  styleUrls: ['./cards-presentation.component.css']
})


export class CardsPresentationComponent implements OnInit {

  // Items
  private section1!: Section;
  private item!: Item;

  // Initializers
  private title!: string;
  private cardsArray!: Array<Item>;

  // Login
  private authentication: boolean = false;

  // Inject
  private _dataService = inject(DataService);
  private _authService = inject(AuthService);

  constructor (){
  }
  
  ngOnInit() {
    this._dataService.readSec1().subscribe(res => {
      // Items
      this.setCurrentTitle(res.title);
      this.section1 = res;

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

  // Title Section 1
  public saveTitle(){
    let sec1 = this.section1;
    sec1.title = this.formModule.controls.title.getRawValue() as string;
    this._dataService.updateSec1(sec1).subscribe(() =>{
      this.title = sec1.title;
    });
  }

  // Cards Section 1 New
  public addCard(){
    let card = this.formCards.controls.addCard.getRawValue();
    let item = {
      title: card.title, 
      text: card.textBody, 
      textCard: {text: card.textEnd},
      imgAssigned: card.img
    };

    let itemNew: Item;

    let images: Array<Img> = [];

    let text: Text;

    this._dataService.addTextC(item.textCard).subscribe(res => {
      text = res as Text;
    })

    for(let i=0; i < item.imgAssigned.length; i++){
      this._dataService.addImg(item.imgAssigned[i] as Img).subscribe(res =>{
        images.push(res as Img);
      })
    };

    this._dataService.addItem(item as Item).subscribe(res => {
      itemNew = res;
      this._dataService.setSec1Item(itemNew.id).subscribe(res => {
        this._dataService.setItemText(itemNew.id, text.id).subscribe(res => {
          itemNew.textCard = res as Text;
          for (let i = 0; i < images.length; i++){
            this._dataService.setItemImg(itemNew.id, images[i].id).subscribe(res => {
              itemNew = res as Item;
            });
          };
        });
      });
      this.cardsArray.push(itemNew);
    });
    this.formCards.controls.addCard.reset();
    window.location.reload();
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
      alert("Maximum 3 imagen");
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
    let images: Array<Img> = [];
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

    for(let i=0; i < cardEdit.imgAssigned.length; i++){
      this._dataService.addImg(cardEdit.imgAssigned[i]).subscribe(res =>{
        cardEdit.imgAssigned[i] = res as Img;
      })
    }
    
    this._dataService.updateItem(cardEdit).subscribe(res => {
      for(let i=0; i < cardEdit.imgAssigned.length; i++) {
        this._dataService.setItemImg(cardEdit.id, cardEdit.imgAssigned[i].id).subscribe(res => {
        });
      }
      this.cardsArray[ref] = cardEdit;
    })
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
      this._dataService.deleteItem(this.cardsArray[index].id).subscribe(res => {})
      this.cardsArray.splice(index, 1);
      this.formCards.controls.select.patchValue(0);
    }
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

}
