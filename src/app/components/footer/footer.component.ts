import { Component, inject, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Icon } from 'src/app/interfaces/Icon.interface';
import { AuthService } from 'src/app/services/auth.service';
import { DataService } from 'src/app/services/data.service';
import { Section } from 'src/app/interfaces/Section.interface';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  // Items
  private footerSec!: Section;
  public svgSelectAddFooter: boolean = false;
  public svgSelectEditFooter: boolean = false;
  private iconClear!: any;
  
  // Initializers
  private iconsFooter!: Icon[];
  private titleFooter!: string;
  private textFooter!: string;

  // Inject
  private _dataService = inject(DataService);
  private _authService = inject(AuthService);

  // Login
  private authentication: boolean = false;

  constructor (){
    this.iconClear = {name: "", svg: false, identity: "", url:""}
  }

  ngOnInit(): void {
    // Authentication
    
    // Footer
    this._dataService.readFooter().subscribe(res => {
      // Items
      this.footerSec = res;
      this.setLogoEdit(res);
      
      // Initializers
      this.authentication = this._authService.logState;
      this.titleFooter = res.title;
      this.textFooter = res.listItem[0].text;
      this.iconsFooter = res.listItem[0].iconAssigned;
    })

    // Forms
    this.formIcons.controls.addIcon.get('svg')?.valueChanges.subscribe(res =>{
      this.svgSelectAddFooter = res as boolean;
    });
    this.formIcons.controls.editIcon.get('svg')?.valueChanges.subscribe(res =>{
      this.svgSelectEditFooter = res as boolean;
    });
  }

  formLogo = new FormGroup({
    title: new FormControl(''),
    text: new FormControl(''),
  })
  formIcons = new FormGroup({
    select: new FormControl(0),
    addIcon: new FormGroup({
      name: new FormControl(),
      svg: new FormControl(false),
      identity: new FormControl(),
      url: new FormControl()
    }),
    editIcon: new FormGroup({
      name: new FormControl(),
      svg: new FormControl(false),
      identity: new FormControl(),
      url: new FormControl()
    })
  })

  // Login
  public get authService() {
    return this.authentication;
  } 

  // Title
  public get title(): string{
    return this.titleFooter;
  }
  
  // Text
  public get text(): string{
    return this.textFooter;
  }
  public setLogoEdit(footer: Section){
    this.formLogo.controls.title.patchValue(footer.title);
    this.formLogo.controls.text.patchValue(footer.listItem[0].text);
  }
  public saveFooter(){
    let footer = this.formLogo.getRawValue();

    if(this.footerSec.title != footer.title && this.footerSec.listItem[0].text != footer.text){
      this.footerSec.title = footer.title as string;
      this.footerSec.listItem[0].text = footer.text as string;
      
      this._dataService.updateFooter(this.footerSec).subscribe(() =>{
        this.titleFooter = footer.title as string;
      });

      this._dataService.updateItem(this.footerSec.listItem[0]).subscribe(() =>{
        this.textFooter = footer.text as string;
      })
    }else{
      if(this.footerSec.title != footer.title){
        this.footerSec.title = footer.title as string;
        this._dataService.updateFooter(this.footerSec).subscribe(() =>{
          this.titleFooter = footer.title as string;
        });
      }
      
      if(this.footerSec.listItem[0].text != footer.text){
        this.footerSec.listItem[0].text = footer.text as string;
        this._dataService.updateItem(this.footerSec.listItem[0]).subscribe(() =>{
          this.textFooter = footer.text as string;
        })
      }
    };

  }
  
  // Icons
  public get icons(): any{
    return this.iconsFooter;
  }
  public addIcon(){
    let iconNew = this.formIcons.controls.addIcon.getRawValue();
    let id: number;
    
    this._dataService.addIcon(iconNew).subscribe(res =>{
      id = res as number;
      this._dataService.setItemIcon(this.footerSec.listItem[0].id as number, id).subscribe(() =>{});
      this.iconsFooter.push(iconNew as Icon);
    })

    this.formIcons.controls.addIcon.patchValue(this.iconClear);
  }
  public identityAdd(){
    this.formIcons.controls.addIcon.controls.identity.patchValue("");
  }
  public setEditIcon(){
    let ref = this.formIcons.controls.select.getRawValue() as number;
    let select = this.icons[ref];
    this.formIcons.controls.editIcon.patchValue(select);
  }
  public editIcon(){
    let ref = this.formIcons.controls.select.getRawValue() as number;
    let iconNew: Icon = this.iconsFooter[ref];

    iconNew.identity = this.formIcons.controls.editIcon.controls.identity.getRawValue();
    iconNew.name = this.formIcons.controls.editIcon.controls.name.getRawValue();
    iconNew.svg = this.formIcons.controls.editIcon.controls.svg.getRawValue() as boolean;
    iconNew.url = this.formIcons.controls.editIcon.controls.url.getRawValue();

    this._dataService.updateIcon(iconNew).subscribe(() =>{});
  }
  public deleteIcon(){
    let ref = this.formIcons.controls.select.getRawValue() as number;
    if(ref == 0){
      alert("To maintain the aesthetics of the page, this Icon in Footer cannot be deleted.")
    }else{
      let iconDel: number = this.iconsFooter[ref].id;
      this.formIcons.controls.select.patchValue(0);
      this._dataService.delItemIcon(this.footerSec.listItem[0].id as number, iconDel).subscribe(() =>{});
      this._dataService.delIcon(iconDel).subscribe(() =>{
        this.iconsFooter.slice(ref, 1);
      });
    }
  }

}
