import { Component, inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Section2 } from 'src/app/interfaces/Section2.interface';
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
  private section5!: Section2;
  private slidesSec5!: Slide[];
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
    this._dataService.readSections().subscribe(res =>{
      // Items
      this.section5 = res[4];
      this.setCurrentTitle(this.section5);

      // Initializers
      this.titleSection = this.section5.title;
      this.slidesSec5 = this.section5.slide;
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
    return this.titleSection;
  }
  private setCurrentTitle(sec5: Section2){
    this.formTitle.controls.title.patchValue(sec5.title);
  }
  public saveTitle(){
    this._dataService.updateSec5(this.formTitle.getRawValue());
  }

  // Slides
  public get items(): any {
    return this.slidesSec5;
  }
  public addSlide(){
    if(this.slidesSec5.length < 11){
      let slide: Slide = this.formSlide.getRawValue().addSlide as Slide;
      this.section5.slide.push(slide);
      this._dataService.updateSec5(this.section5);
      this.formSlide.controls.addSlide.patchValue(this.slideClear);
    }else{
      alert('Maximum 10 slides to maintain aesthetics')
    }
  }
  public setEditSlide(){
    let ref = this.formSlide.getRawValue().select as number;
    let select = this.section5.slide[ref];
    this.formSlide.controls.editSlide.patchValue(select);
  }
  public editSlide(){
    let ref = this.formSlide.controls.select.getRawValue() as number;
    this.section5.slide[ref] = this.formSlide.controls.editSlide.getRawValue() as Slide;
    this._dataService.updateSec5(this.section5);
  }
  public deleteSlide(){
    let index = this.formSlide.controls.select.getRawValue() as number;
    if(index <= 1){
      alert("To maintain the aesthetics of the page, this slide cannot be deleted.")
    }else{
      this.section5.slide.splice(index, 1);
      this._dataService.updateSec5(this.section5);
      this.formSlide.controls.select.patchValue(0);
    }
  }

}
