import { Component, Input, inject, OnInit } from '@angular/core';
import { Slide } from 'src/app/interfaces/Slide.interface';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-item-work',
  templateUrl: './item-work.component.html',
  styleUrls: ['./item-work.component.css']
})
export class ItemWorkComponent implements OnInit {

  @Input() interaction: any;

  // Items
  private slideWork!: Slide;

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
      this.slideWork = res[1].slide[this.interaction];
      
      // Initializers
      this.titleSlide = this.slideWork.title;
      this.textSlide = this.slideWork.text;
      this.imgNameSlide = this.slideWork.imgName;
      this.imgUrlSlide = this.slideWork.imgUrl;
    })
  }


  // Title item
  public get title(): string {
    return this.titleSlide;
  }
  
  // Text item
  public get text(): string {
    return this.textSlide;
  }

  // ImgName item
  public get imgName(): string {
    return this.imgNameSlide;
  }
  
  // ImgUrl item
  public get imgUrl(): string {
    return this.imgUrlSlide;
  }

}
