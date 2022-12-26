import { Component, Input } from '@angular/core';
import { IndexService } from 'src/app/services/index.service';

@Component({
  selector: 'app-item-work',
  templateUrl: './item-work.component.html',
  styleUrls: ['./item-work.component.css']
})
export class ItemWorkComponent {

  constructor (
    private _indexService: IndexService,
  ) {}

  @Input() interaction: any;

  // Title item
  public get title(): string {
    return this._indexService.section2.works[this.interaction].titleItem;
  }
  public set title(value: string) {
    this._indexService.section2.works[this.interaction].titleItem = value;
  }
  
  // Text item
  public get text(): string {
    return this._indexService.section2.works[this.interaction].textItem;
  }
  public set text(value: string) {
    this._indexService.section2.works[this.interaction].textItem = value;
  }

  // ImgName item
  public get imgName(): string {
    return this._indexService.section2.works[this.interaction].imgName;
  }
  public set imgName(value: string) {
    this._indexService.section2.works[this.interaction].imgName = value;
  }
  
  // ImgUrl item
  public get imgUrl(): string {
    return this._indexService.section2.works[this.interaction].imgUrl;
  }
  public set imgUrl(value: string) {
    this._indexService.section2.works[this.interaction].imgUrl = value;
  }

}
