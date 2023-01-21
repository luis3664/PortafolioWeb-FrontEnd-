import { Component, OnInit, inject } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Bar } from 'src/app/interfaces/Bar.interface';
import { Section4 } from 'src/app/interfaces/Section4.interface';
import { TopicSec4 } from 'src/app/interfaces/TopicSec4.interface';
import { AuthService } from 'src/app/services/auth.service';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-skills',
  templateUrl: './skills.component.html',
  styleUrls: ['./skills.component.css']
})

export class SkillsComponent implements OnInit {
  // Items
  private section4!: Section4;
  private barsOfTopic!: Bar[];
  private titleTopicSelect!: string;
  public svgSelectEdit: Boolean = false;
  public svgSelectAdd: Boolean = false;
  private barClear!: Bar;
  private topicClear!: string;

  // Initializers
  private titleSection!: string;
  private topicsSec4!: TopicSec4[];

  // Inject
  private _dataService = inject(DataService);
  private _authService = inject(AuthService);

  // Login
  private authentication: any = this._authService;

  constructor (){
    this.barClear ={name: "", svg: false, icon: "", url: "", valueBar: 0};
    this.topicClear = "";
  }

  ngOnInit(): void {
    this._dataService.readSections().subscribe(res =>{
      // Items
      this.section4 = res[3];
      this.setCurrentTitle(this.section4);

      // Initializers
      this.titleSection = this.section4.title;
      this.topicsSec4 = this.section4.topics;
    })
  }

  formTitle = new FormGroup({
    title: new FormControl('', Validators.required)
  })
  formTopics = new FormGroup({
    select: new FormControl(0),
    addTopic: new FormGroup({
      title: new FormControl()
    }),
    editTopic: new FormGroup({
      title: new FormControl()
    })
  })
  formBars = new FormGroup({
    select: new FormControl(0),
    addBar: new FormGroup({
      name: new FormControl(),
      svg: new FormControl(false),
      icon: new FormControl(),
      url: new FormControl(),
      valueBar: new FormControl(0)
    }),
    editBar: new FormGroup({
      name: new FormControl(),
      svg: new FormControl(false),
      icon: new FormControl(),
      url: new FormControl(),
      valueBar: new FormControl(0)
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
  private setCurrentTitle(sec4: Section4){
    this.formTitle.controls.title.patchValue(sec4.title);
  }
  public saveTitle(){
    this._dataService.updateSec4(this.formTitle.getRawValue());
  }

  // Topics
  public get topics(): any {
    return this.topicsSec4;
  }
  public addTopic(){
    let topic = this.formTopics.getRawValue().addTopic;
    this.section4.topics.push(topic as TopicSec4);
    this._dataService.updateSec4(this.section4);
    this.formTopics.controls.addTopic.controls.title.patchValue(this.topicClear);
  }
  public deleteTopic(): void{
    let index = this.formTopics.controls.select.getRawValue() as number;
    if(index <= 1){
      alert("To maintain the aesthetics of the page, this topic cannot be deleted.")
    }else{
      this.section4.topics.splice(index, 1);
      this._dataService.updateSec4(this.section4);
      this.formTopics.controls.select.patchValue(0);
    }
  }
  public setEditTopic(){
    let ref = this.formTopics.getRawValue().select as number;
    let select = this.section4.topics[ref];
    this.formTopics.controls.editTopic.patchValue(select);
  }
  public editTopic(){
    let ref = this.formTopics.controls.select.getRawValue() as number;
    this.section4.topics[ref].title = this.formTopics.controls.editTopic.getRawValue().title;
    this._dataService.updateSec4(this.section4);
  }

  // Bars
  public get bars(): any{
    return this.barsOfTopic;
  }
  public get titleTopic(): string{
    return this.titleTopicSelect;
  }
  public setBarsOfTopic(){
    let ref = this.formTopics.getRawValue().select as number;
    this.barsOfTopic = this.section4.topics[ref].bars;
    this.titleTopicSelect = this.section4.topics[ref].title as string;
  }
  public addBar(){
    let barNew = this.formBars.controls.addBar.getRawValue();
    let refTopic = this.formTopics.getRawValue().select as number;
    this.section4.topics[refTopic].bars.push(barNew as Bar);
    this._dataService.updateSec4(this.section4);
    this.formBars.controls.addBar.patchValue(this.barClear);
    this.setBarsOfTopic();
  }
  public deleteBar(){
    let refBar = this.formBars.getRawValue().select as number;
    let refTopic = this.formTopics.getRawValue().select as number;
    if(refTopic <= 1 && refBar == 0){
      alert("To maintain the aesthetics of the page, this Bar in this Topic cannot be deleted.")
    }else{
      this.section4.topics[refTopic].bars.splice(refBar, 1);
      this._dataService.updateSec4(this.section4);
      this.setBarsOfTopic();
      this.formBars.controls.select.patchValue(0);
    }
  }
  public setEditBar(){
    let ref = this.formBars.getRawValue().select as number;
    let bar = this.barsOfTopic[ref];
    this.formBars.controls.editBar.patchValue(bar);
  }
  public editBar(){
    let barNew = this.formBars.controls.editBar.getRawValue();
    let refBar = this.formBars.getRawValue().select as number;
    let refTopic = this.formTopics.getRawValue().select as number;
    this.section4.topics[refTopic].bars[refBar] = barNew as Bar;
    this._dataService.updateSec4(this.section4);
    this.setBarsOfTopic();
  }

}
