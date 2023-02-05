import { Component, inject, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Footer } from 'src/app/interfaces/Footer.interface';
import { Icon } from 'src/app/interfaces/Icon.interface';
import { Logo } from 'src/app/interfaces/Logo.interface';
import { AuthService } from 'src/app/services/auth.service';
import { DataService } from 'src/app/services/data.service';
import { ImgLogo } from 'src/app/interfaces/ImgLogo.interface';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  // Items
  private footerSec!: Footer;
  private imgLogo!: ImgLogo;
  private indexCurrent!: number;
  public svgSelectAddFooter: boolean = false;
  public svgSelectEditFooter: boolean = false;
  private iconClear!: Icon;
  
  // Initializers
  private iconsFooter!: Icon[];
  private titleFooter!: string;
  private textFooter!: string;
  private logos!: Logo[];

  // Inject
  private _dataService = inject(DataService);
  private _authService = inject(AuthService);

  // Login
  private authentication: boolean = false;

  constructor (){
    this.iconClear = {name: "", svg: false, icon: "", svgUrl: "", url:""}
  }

  ngOnInit(): void {
    // Logo Image
    this._dataService.readLogoImg().subscribe(res =>{
      this.imgLogo = res[0];
      this.logos = this.imgLogo.logos;
    });

    // Footer
    this._dataService.readFooter().subscribe(res =>{
      // Items
      this.footerSec = res[0];
      this.indexCurrent = res[0].currentIndexLogo;
      this.setLogoEdit(this.footerSec);

      // Initializers
      this.iconsFooter = this.footerSec.icons;
      this.titleFooter = this.footerSec.title;
      this.textFooter = this.footerSec.text;
      this.authentication = this._authService.logState;
    });

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
      icon: new FormControl(),
      svgUrl: new FormControl(),
      url: new FormControl()
    }),
    editIcon: new FormGroup({
      name: new FormControl(),
      svg: new FormControl(false),
      icon: new FormControl(),
      svgUrl: new FormControl(),
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
  public setLogoEdit(footer: Footer){
    this.formLogo.patchValue(footer);
  }
  public saveFooter(){
    let footer = this.formLogo.getRawValue();
    this.footerSec.title = footer.title as string;
    this.footerSec.text = footer.text as string;
    this._dataService.updateFooter(this.footerSec);
  }
  
  // Icons
  public get icons(): any{
    return this.iconsFooter;
  }
  public addIcon(){
    let iconNew = this.formIcons.controls.addIcon.getRawValue();
    this.footerSec.icons.push(iconNew as Icon);
    this._dataService.updateFooter(this.footerSec);
    this.formIcons.controls.addIcon.patchValue(this.iconClear);
  }
  public setEditIcon(){
    let ref = this.formIcons.controls.select.getRawValue() as number;
    let select = this.footerSec.icons[ref];
    this.formIcons.controls.editIcon.patchValue(select);
  }
  public editIcon(){
    let ref = this.formIcons.controls.select.getRawValue() as number;
    this.footerSec.icons[ref] = this.formIcons.controls.editIcon.getRawValue() as Icon;
    this._dataService.updateFooter(this.footerSec);
  }
  public deleteIcon(){
    let ref = this.formIcons.controls.select.getRawValue() as number;
    if(ref == 0){
      alert("To maintain the aesthetics of the page, this Icon in Footer cannot be deleted.")
    }else{
      this.formIcons.controls.select.patchValue(0);
      this.footerSec.icons.splice(ref, 1);
      this._dataService.updateFooter(this.footerSec);
    }
  }

}
