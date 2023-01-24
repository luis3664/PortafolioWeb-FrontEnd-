import { Component, inject, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { DataService } from 'src/app/services/data.service';
import { Section2 } from 'src/app/interfaces/Section2.interface';
import { Slide } from 'src/app/interfaces/Slide.interface';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-works',
  templateUrl: './works.component.html',
  styleUrls: ['./works.component.css']
})
export class WorksComponent implements OnInit {

  // Items
  private section2!: Section2;
  
  // Initializers
  private titleSlide!: string;
  private slidesWork!: Slide[];

  // Login
  private authentication: boolean = false;

  private _dataService = inject(DataService);
  private _authService = inject(AuthService);

  constructor (){
  }

  ngOnInit(): void {
    this._dataService.readSections().subscribe(res =>{
      // Items
      this.section2 = res[1];
      this.setCurrentTitle(this.section2);
      
      // Initializers
      this.titleSlide = this.section2.title;
      this.slidesWork = this.section2.slide;
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
  private setCurrentTitle(sec2: Section2){
    this.formTitle.controls.title.patchValue(sec2.title);
  }
  public saveTitle(){
    this._dataService.updateSec2(this.formTitle.getRawValue());
  }

  // Slides
  public get slides(){
    return this.slidesWork;
  }

  public addSlide(){
    if(this.slidesWork.length < 11){
      let slide: Slide = this.formSlide.getRawValue().addSlide as Slide;
      this.section2.slide.push(slide);
      this._dataService.updateSec2(this.section2);
    }else{
      alert('Maximum 10 slides to maintain aesthetics')
    }
  }

  public setEditSlide(){
    let ref = this.formSlide.getRawValue().select as number;
    let select = this.section2.slide[ref];
    this.formSlide.controls.editSlide.patchValue(select);
  }

  public editSlide(){
    let ref = this.formSlide.controls.select.getRawValue() as number;
    this.section2.slide[ref] = this.formSlide.controls.editSlide.getRawValue() as Slide;
    this._dataService.updateSec2(this.section2);
  }

  public deleteSlide(){
    let index = this.formSlide.controls.select.getRawValue() as number;
    if(index <= 1){
      alert("To maintain the aesthetics of the page, this slide cannot be deleted.")
    }else{
      this.section2.slide.splice(index, 1);
      this._dataService.updateSec2(this.section2);
      this.formSlide.controls.select.patchValue(0);
    }
  }

}
