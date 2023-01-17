import { Component, inject, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { DataService } from 'src/app/services/data.service';
import { IndexService } from 'src/app/services/index.service';

@Component({
  selector: 'app-cards-presentation',
  templateUrl: './cards-presentation.component.html',
  styleUrls: ['./cards-presentation.component.css']
})


export class CardsPresentationComponent implements OnInit {

  private section1: any;
  private title!: string;
  private cardsArray!: Array<object>;
  // Login
  private authentication: any;

  private _db = inject(DataService);
  private _indexService = inject(IndexService);

  constructor (
    private _authService: AuthService, 
    ) {
      this.authentication = this._authService;

  }
  
  ngOnInit() {
    this._indexService.getData().subscribe(data => {
      this.section1 = data.section1;
      this.title = this.section1.title;
      this.cardsArray = this.section1.cards;
    });
  }

  formModule = new FormGroup({
    title: new FormControl('', Validators.required),
    items: new FormArray([]),
  })

  // Login
  public get authService() {
    return this.authentication;
  } 

  // Title Section
  public get titleSection(): string {
    return this.title;
  }

  // Cards for ngFor
  public get cards(): any {
    return this.cardsArray;
  }

  public saveTitle(){
    (this.formModule.get('title') as FormControl)
  }
}
