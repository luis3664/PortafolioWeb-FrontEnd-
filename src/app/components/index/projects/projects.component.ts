import { Component, inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Img } from 'src/app/interfaces/Img.interface';
import { Item } from 'src/app/interfaces/Item.interface';
import { Section } from 'src/app/interfaces/Section.interface';
import { Slide } from 'src/app/interfaces/Slide.interface';
import { AuthService } from 'src/app/services/auth.service';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css']
})
export class ProjectsComponent implements OnInit {

  // Items
  private section5!: Section;
  private slidesSec5!: Item[];
  private slideClear!: Slide;

  // Initializers
  private titleSection!: string;

  // Inject
  private _dataService = inject(DataService);
  private _authService = inject(AuthService);

  // Login
  private authentication: boolean = false;

  constructor (){
    this.slideClear = {title: "", text: "", imgName: "", imgUrl: ""}
  }

  ngOnInit(): void {
    this._dataService.readSec5().subscribe(res => {
      // Items
      this.section5 = res;
      this.setCurrentTitle(this.section5.title);

      // Initializers
      this.titleSection = this.section5.title;
      this.slidesSec5 = this.section5.listItem;
      this.authentication = this._authService.logState;
    });
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
    return this.titleSection;
  }
  private setCurrentTitle(title: string){
    this.formTitle.controls.title.patchValue(title);
  }
  public saveTitle(){
    this.section5.title = this.formTitle.controls.title.getRawValue() as string;
    this._dataService.updateSec5(this.section5).subscribe(res => {
      this.titleSection = this.section5.title;
    });
  }

  // Slides
  public get items(): any {
    return this.slidesSec5;
  }
  public addSlide(){
    if(this.slidesSec5.length < 11){
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
          this._dataService.setSec5Item(itemNew.id).subscribe(res => {
            this._dataService.setItemImg(itemNew.id, img.id).subscribe(res => {
              this.slidesSec5.push(res as Item);
            })
          })
        })
      });
      this.formSlide.controls.addSlide.patchValue(this.slideClear);
    }else{
      alert('Maximum 10 slides to maintain aesthetics')
    }
  }
  public setEditSlide(){
    let ref = this.formSlide.getRawValue().select as number;
    let select = this.section5.listItem[ref];
    this.formSlide.controls.editSlide.controls.title.patchValue(select.title);
    this.formSlide.controls.editSlide.controls.text.patchValue(select.text);
    this.formSlide.controls.editSlide.controls.imgName.patchValue(select.imgAssigned[0].name);
    this.formSlide.controls.editSlide.controls.imgUrl.patchValue(select.imgAssigned[0].url);
  }
  public editSlide(){
    let ref = this.formSlide.controls.select.getRawValue() as number;
    let slide = this.formSlide.controls.editSlide.getRawValue();
    let item: Item = this.slidesSec5[ref];
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
        this._dataService.setItemImg(itemNew.id, img.id).subscribe(res => {
          this.slidesSec5[ref] = res as Item;
        })
      })
    });
  }
  public deleteSlide(){
    let index = this.formSlide.controls.select.getRawValue() as number;
    if(index <= 1){
      alert("To maintain the aesthetics of the page, this slide cannot be deleted.")
    }else{
      this._dataService.deleteItem(this.slidesSec5[index].id).subscribe(res => {
        this.slidesSec5.splice(index, 1);
        this.formSlide.controls.select.patchValue(0);
      });
    }
  }

}
