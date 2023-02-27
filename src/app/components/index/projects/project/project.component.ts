import { Component, Input, inject, OnInit } from '@angular/core';
import { Item } from 'src/app/interfaces/Item.interface';
import { Slide } from 'src/app/interfaces/Slide.interface';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.css']
})
export class ProjectComponent implements OnInit {

  @Input('iProjects') interactor: any;
  @Input() slideP!: Item;

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
    // Initializers
    this.titleSlide = this.slideP.title;
    this.textSlide = this.slideP.text;
    this.imgNameSlide = this.slideP.imgAssigned[0].name;
    this.imgUrlSlide = this.slideP.imgAssigned[0].url;
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
