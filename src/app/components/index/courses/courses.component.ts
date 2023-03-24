import { Component, inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Certificate } from 'src/app/interfaces/Certificate.interface';
import { Img } from 'src/app/interfaces/Img.interface';
import { Item } from 'src/app/interfaces/Item.interface';
import { Section } from 'src/app/interfaces/Section.interface';
import { AuthService } from 'src/app/services/auth.service';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.css']
})
export class CoursesComponent implements OnInit{

  // Items
  private section3!: Section;
  
  // Initializers
  private titleSection!: string;
  private cardsSec3!: Item[];

  // Inject
  private _dataService = inject(DataService);
  private _authService = inject(AuthService);

  private authentication: boolean = false;

  constructor (){
  }

  ngOnInit(): void {
    this._dataService.readSec3().subscribe(res => {
      // Items
      this.section3 = res;
      this.setCurrentTitle(this.section3.title);
      
      
      // Initializers
      this.titleSection = this.section3.title;
      this.cardsSec3 = this.section3.listItem;
      this.authentication = this._authService.logState;
    });
  }

  formTitle = new FormGroup({
    title: new FormControl('', Validators.required)
  })
  formCards = new FormGroup({
    select: new FormControl(0),
    addCard: new FormGroup({
      title: new FormControl(''),
      text: new FormControl(''),
      date: new FormControl(),
      imgName: new FormControl(''),
      imgUrl: new FormControl(''),
      certificateUrl: new FormControl('')
    }),
    editCard: new FormGroup({
      title: new FormControl(''),
      text: new FormControl(''),
      date: new FormControl(),
      imgName: new FormControl(''),
      imgUrl: new FormControl(''),
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
  private setCurrentTitle(title: string){
    this.formTitle.controls.title.patchValue(title);
  }
  public saveTitle(){
    let sec3 = this.section3;
    sec3.title = this.formTitle.controls.title.getRawValue() as string;
    this._dataService.updateSec3(sec3).subscribe(() =>{
      this.titleSection = sec3.title;
    });
  }
  
  // Cards
  public get cards(): Item[] {
    return this.cardsSec3;
  }
  public addCard(){
    let card = this.formCards.getRawValue().addCard;
    let img: Img;
    let certificate: Certificate;
    let imgs = {
      name: card.imgName,
      url: card.imgUrl
    };
    let certi = {
      urlCertificate: card.certificateUrl,
      date: card.date
    }
    let item = {
      title: card.title,
      text: card.text,
      imgAssigned: [],
      certificate: {},
      iconAssigned: null,
      textCard: null
    }

    this._dataService.addImg(imgs as Img).subscribe(res => {
      img = res as Img;
      this._dataService.addCertiCard(certi as Certificate).subscribe(res => {
        certificate = res as Certificate;
        this._dataService.addItemC(item, img.id, certificate.id).subscribe(res => {
          console.log(res);
          this.section3.listItem.push(res);
        })
      });
    });
  }
  public setEditCard(){
    let ref = this.formCards.getRawValue().select as number;
    let select = this.section3.listItem[ref];
    this.formCards.controls.editCard.controls.title.patchValue(select.title);
    this.formCards.controls.editCard.controls.text.patchValue(select.text);
    this.formCards.controls.editCard.controls.date.patchValue(select.certificate.date);
    this.formCards.controls.editCard.controls.imgName.patchValue(select.imgAssigned[0].name);
    this.formCards.controls.editCard.controls.imgUrl.patchValue(select.imgAssigned[0].url);
    this.formCards.controls.editCard.controls.certificateUrl.patchValue(select.certificate.urlCertificate);
  }
  public editCard(){
    let ref = this.formCards.controls.select.getRawValue() as number;
    let item: Item = this.section3.listItem[ref];
    let card = this.formCards.controls.editCard.getRawValue();
    let img: Img = item.imgAssigned[0];
    let certificate: Certificate = item.certificate;

    item.title = card.title as string;
    item.text = card.text as string;

    img.name = card.imgName as string;
    img.url = card.imgUrl as string;

    certificate.date = card.date as Date;
    certificate.urlCertificate = card.certificateUrl as string;

    this._dataService.addImg(img).subscribe(res => {
      img = res as Img;
      this._dataService.updateCertiCard(certificate).subscribe(res => {
        certificate = res as Certificate;
        this._dataService.updateItemC(item, img.id, certificate.id).subscribe(res => {
          this.section3.listItem[ref] = res;
        })
      });
    });
  }
  public deleteCard() {
    let index = this.formCards.controls.select.getRawValue() as number;
    if(index == 0){
      alert("To maintain the aesthetics of the page, this card cannot be deleted.");
    }else{
      this._dataService.deleteItem(this.section3.listItem[index].id as number).subscribe(res => {
        this.section3.listItem.splice(index, 1);
        this.formCards.controls.select.patchValue(0);
      });
    }
  }
  
}