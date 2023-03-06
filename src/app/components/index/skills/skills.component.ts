import { Component, OnInit, inject } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Bar } from 'src/app/interfaces/Bar.interface';
import { Icon } from 'src/app/interfaces/Icon.interface';
import { Section } from 'src/app/interfaces/Section.interface';
import { Topic } from 'src/app/interfaces/Topic.interface';
import { AuthService } from 'src/app/services/auth.service';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-skills',
  templateUrl: './skills.component.html',
  styleUrls: ['./skills.component.css']
})

export class SkillsComponent implements OnInit {
  // Items
  private section4!: Section;
  private barsOfTopic!: Bar[];
  private titleTopicSelect!: string;
  public svgSelectEdit: Boolean = false;
  public svgSelectAdd: Boolean = false;
  private barClear!: any;
  private topicClear!: string;

  // Initializers
  private titleSection!: string;
  private topicsSec4!: Topic[];

  // Inject
  private _dataService = inject(DataService);
  private _authService = inject(AuthService);

  // Login
  private authentication: boolean = false;

  constructor (){
    this.barClear ={name: "", svg: false, icon: "", url: "", valueBar: 0};
    this.topicClear = "";
  }

  ngOnInit(): void {
    this._dataService.readSec4().subscribe(res => {
      // Items
      this.section4 = res;
      this.setCurrentTitle(this.section4.title);

      // Initializers
      this.titleSection = this.section4.title;
      this.topicsSec4 = this.section4.listTopic;
      this.authentication = this._authService.logState;
    });

    // Forms
    this.formBars.controls.addBar.get('svg')?.valueChanges.subscribe(res =>{
      this.svgSelectAdd = res as boolean;
    });
    this.formBars.controls.editBar.get('svg')?.valueChanges.subscribe(res =>{
      this.svgSelectEdit = res as boolean;
    });
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
      valueBar: new FormControl(0)
    }),
    editBar: new FormGroup({
      name: new FormControl(),
      svg: new FormControl(false),
      icon: new FormControl(),
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
  private setCurrentTitle(title: string){
    this.formTitle.controls.title.patchValue(title);
  }
  public saveTitle(){
    let title: string = this.formTitle.controls.title.getRawValue() as string;

    this.section4.title = title;

    this._dataService.updateSec4(this.section4).subscribe(res => {
      this.titleSection = title;
    })
  }

  // Topics
  public get topics(): any {
    return this.topicsSec4;
  }
  public addTopic(){
    let topic = this.formTopics.getRawValue().addTopic;
    
    this._dataService.addTopic(topic).subscribe(res => {
      this.section4.listTopic.push(res as Topic);
    });
    this.formTopics.controls.addTopic.controls.title.patchValue(this.topicClear);
  }
  public deleteTopic(): void{
    let index = this.formTopics.controls.select.getRawValue() as number;
    if(index <= 1){
      alert("To maintain the aesthetics of the page, this topic cannot be deleted.")
    }else{
      this._dataService.delTopic(this.section4.listTopic[index].id).subscribe(res => {
        this.section4.listTopic.splice(index, 1);
        this.formTopics.controls.select.patchValue(0);
      })
    }
  }
  public setEditTopic(){
    let ref = this.formTopics.getRawValue().select as number;
    let select = this.section4.listTopic[ref];

    this.formTopics.controls.editTopic.controls.title.patchValue(select.title);
  }
  public editTopic(){
    let ref = this.formTopics.controls.select.getRawValue() as number;

    let topic = this.section4.listTopic[ref];

    topic.title = this.formTopics.controls.editTopic.getRawValue().title;

    this._dataService.updateTopic(topic).subscribe(res => {
      this.section4.listTopic[ref] = res as Topic;
    });
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
    this.barsOfTopic = this.section4.listTopic[ref].listBar;
    this.titleTopicSelect = this.section4.listTopic[ref].title as string;
  }
  public addBar(){
    let barNew = this.formBars.controls.addBar.getRawValue();
    let ref = this.formTopics.getRawValue().select as number;
    let topicId = this.section4.listTopic[ref].id;
    let bar: Bar = {
      id: null,
      title: barNew.name as string,
      value: barNew.valueBar as number,
      icon: {
        id: null,
        name: barNew.name,
        identity: barNew.icon,
        url: "",
        svg: barNew.svg as boolean
      }
    };

    this._dataService.addIcon(bar.icon).subscribe(res => {
      this._dataService.addBar(res as number, bar).subscribe(res => {
        this._dataService.addBarTopic(topicId, res as number).subscribe(res => {
          bar = res as Bar;
          this.section4.listTopic[ref].listBar.push(bar);
        });
      });
    });

    this.formBars.controls.addBar.patchValue(this.barClear);
    this.setBarsOfTopic();
  }
  public deleteBar(){
    let refBar = this.formBars.getRawValue().select as number;
    let refTopic = this.formTopics.getRawValue().select as number;
    if(refTopic <= 1 && refBar == 0){
      alert("To maintain the aesthetics of the page, this Bar in this Topic cannot be deleted.")
    }else{
      let id = this.section4.listTopic[refTopic].listBar[refBar].id as number;
      this._dataService.delBar(id).subscribe(res => {
        this.formBars.controls.select.patchValue(0);
        this.section4.listTopic[refTopic].listBar.splice(refBar, 1);
        this.setBarsOfTopic();
      });
    }
  }
  public setEditBar(){
    let ref = this.formBars.getRawValue().select as number;
    let bar = this.barsOfTopic[ref];
    this.formBars.controls.editBar.controls.name.patchValue(bar.icon.name);
    this.formBars.controls.editBar.controls.svg.patchValue(bar.icon.svg);
    this.formBars.controls.editBar.controls.icon.patchValue(bar.icon.identity);
    this.formBars.controls.editBar.controls.valueBar.patchValue(bar.value);
  }
  public editBar(){
    let barNew = this.formBars.controls.editBar.getRawValue();
    let refBar = this.formBars.getRawValue().select as number;
    let refTopic = this.formTopics.getRawValue().select as number;
    let topicId = this.section4.listTopic[refTopic].id;
    let bar = this.section4.listTopic[refTopic].listBar[refBar];

    bar.icon.name = barNew.name;
    bar.icon.identity = barNew.icon;
    bar.icon.svg = barNew.svg as boolean;
    bar.value = barNew.valueBar as number;
    bar.title = barNew.name;
    
    this._dataService.updateIcon(bar.icon as Icon).subscribe(res => {
      this._dataService.updateBar(bar.id as number, bar.icon.id as number, bar).subscribe(res => {
        this.section4.listTopic[refTopic].listBar[refBar] = res as Bar;
        this.setBarsOfTopic();
      });
    });
  }

}
