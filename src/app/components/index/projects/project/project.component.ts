import { Component, Input, inject, OnInit } from '@angular/core';
import { Section2 } from 'src/app/interfaces/Section2.interface';
import { Slide } from 'src/app/interfaces/Slide.interface';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.css']
})
export class ProjectComponent implements OnInit {

  @Input('iProjects') interactor: any;

  // Items
  private section5!: Section2;
  private slideSec5!: Slide;

  // Initializers
  private titleSlide!: string;
  private textSlide!: string;
  private imgNameSlide!: string;
  private imgUrlSlide!: string;

  // Inject
  private _dataService = inject(DataService);

  constructor (){
  }
  
  ngOnInit(): void {
    this._dataService.readSections().subscribe(res =>{
      // Items
      this.section5 = res[4];
      this.slideSec5 = this.section5.slide[this.interactor];
      
      // Initializers
      this.titleSlide = this.slideSec5.title;
      this.textSlide = this.slideSec5.text;
      this.imgNameSlide = this.slideSec5.imgName;
      this.imgUrlSlide = this.slideSec5.imgUrl;
    })
  }

  // Title Project
  public get title(): string {
    return this.titleSlide;
  }
 
  // Text Project
  public get text(): string {
    return this.textSlide;
  }
  
  // imgUrl Project
  public get imgUrl(): string {
    return this.imgUrlSlide;
  }
  
  // imgName Project
  public get imgName(): string {
    return this.imgNameSlide;
  }

}
