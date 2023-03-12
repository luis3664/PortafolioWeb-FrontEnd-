import { Component, inject, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { DataService } from 'src/app/services/data.service';
import { Slide } from 'src/app/interfaces/Slide.interface';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Section } from 'src/app/interfaces/Section.interface';
import { Item } from 'src/app/interfaces/Item.interface';
import { Img } from 'src/app/interfaces/Img.interface';

@Component({
  selector: 'app-works',
  templateUrl: './works.component.html',
  styleUrls: ['./works.component.css']
})
export class WorksComponent implements OnInit {

  // Items
  private section2!: Section;
  
  // Initializers
  private titleSlide!: string;
  private slidesWork!: Item[];

  // Login
  private authentication: boolean = false;

  private _dataService = inject(DataService);
  private _authService = inject(AuthService);

  constructor (){
  }
  
  ngOnInit(): void {
    this._dataService.readSec2().subscribe(res => {
      // Items
      this.section2 = res;
      this.setCurrentTitle(this.section2.title);
      
      // // Initializers
      this.titleSlide = this.section2.title;
      this.slidesWork = this.section2.listItem;
      this.authentication = this._authService.logState;
    })
  }
  
  // Forms
  formTitle = new FormGroup({
    title: new FormControl('', Validators.required)
  })
  formSlide = new FormGroup({
    select: new FormControl(0),
    addSlide: new FormGroup({
      title: new FormControl(''),
      text: new FormControl(''),
      imgName: new FormControl(''),
      imgUrl: new FormControl('')
    }),
    editSlide: new FormGroup({
      title: new FormControl(''),
      text: new FormControl(''),
      imgName: new FormControl(''),
      imgUrl: new FormControl('')
    })
  })

  // Login
  public get authService() {
    return this.authentication;
  } 

  // Title Section
  public get title(): string {
    return this.titleSlide;
  }
  private setCurrentTitle(title: string){
    this.formTitle.controls.title.patchValue(title);
  }
  public saveTitle(){
    this.section2.title = this.formTitle.controls.title.getRawValue() as string;
    this._dataService.updateSec2(this.section2).subscribe(res => {
      this.titleSlide = this.section2.title;
    });
  }

  // Slides
  public get slides(){
    return this.slidesWork;
  }

  public addSlide(){
    if(this.slidesWork.length < 11){
      let slide: Slide = this.formSlide.getRawValue().addSlide as Slide;
      let item = {
        title: "",
        text: "",
        imgAssigned: [{name: "", url: ""}]
      };
      let img: Img;
      let itemNew: Item;

      // Set
      item.title = slide.title as string;
      item.text = slide.text;
      item.imgAssigned[0].name = slide.imgName;
      item.imgAssigned[0].url = slide.imgUrl;

      this._dataService.addImg(item.imgAssigned[0] as Img).subscribe(res => {
        img = res as Img;
        this._dataService.addItem(item as Item).subscribe(res => {
          itemNew = res as Item
          this._dataService.setSec2Item(itemNew.id as number).subscribe(res => {
            this._dataService.setItemImg(itemNew.id as number, img.id).subscribe(res => {
              this.slidesWork.push(res as Item);
            })
          })
        })
      });
    }else{
      alert('Maximum 10 slides to maintain aesthetics')
    }
  }

  public setEditSlide(){
    let ref = this.formSlide.getRawValue().select as number;
    let select = this.section2.listItem[ref];
    this.formSlide.controls.editSlide.controls.title.patchValue(select.title);
    this.formSlide.controls.editSlide.controls.text.patchValue(select.text);
    this.formSlide.controls.editSlide.controls.imgName.patchValue(select.imgAssigned[0].name);
    this.formSlide.controls.editSlide.controls.imgUrl.patchValue(select.imgAssigned[0].url);
  }

  public editSlide(){
    let ref = this.formSlide.controls.select.getRawValue() as number;
    let slide = this.formSlide.controls.editSlide.getRawValue();
    let item: Item = this.slidesWork[ref];
    let img: Img;
    let itemNew: Item;

    // Set
    item.title = slide.title as string;
    item.text = slide.text as string;
    item.imgAssigned[0].name = slide.imgName as string;
    item.imgAssigned[0].url = slide.imgUrl as string;

    this._dataService.addImg(item.imgAssigned[0] as Img).subscribe(res => {
      img = res as Img;
      this._dataService.updateItem(item as Item).subscribe(res => {
        itemNew = res as Item
        this._dataService.setItemImg(itemNew.id as number, img.id).subscribe(res => {
          this.slidesWork[ref] = res as Item;
        })
      })
    });
  }

  public deleteSlide(){
    let index = this.formSlide.controls.select.getRawValue() as number;
    if(index <= 1){
      alert("To maintain the aesthetics of the page, this slide cannot be deleted.")
    }else{
      this._dataService.deleteItem(this.slidesWork[index].id as number).subscribe(res => {
        this.slidesWork.splice(index, 1);
        this.formSlide.controls.select.patchValue(0);
      });
    }
  }

}
