import { Component, Input } from '@angular/core';
import { IndexService } from 'src/app/services/index.service';

@Component({
  selector: 'app-item-work',
  templateUrl: './item-work.component.html',
  styleUrls: ['./item-work.component.css']
})
export class ItemWorkComponent {

  @Input() interaction: any;
  private works: any;

  constructor (
    private _indexService: IndexService,
  ){
    this._indexService.getData().subscribe(data => {
      this.works = data.section2.works;
    })
  }


  // Title item
  public get title(): string {
    return this.works[this.interaction].titleItem;
  }
  public set title(value: string) {
    this.works[this.interaction].titleItem = value;
  }
  
  // Text item
  public get text(): string {
    return this.works[this.interaction].textItem;
  }
  public set text(value: string) {
    this.works[this.interaction].textItem = value;
  }

  // ImgName item
  public get imgName(): string {
    return this.works[this.interaction].imgName;
  }
  public set imgName(value: string) {
    this.works[this.interaction].imgName = value;
  }
  
  // ImgUrl item
  public get imgUrl(): string {
    return this.works[this.interaction].imgUrl;
  }
  public set imgUrl(value: string) {
    this.works[this.interaction].imgUrl = value;
  }

}
