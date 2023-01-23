import { inject, Injectable } from '@angular/core';
import { collection, collectionData, doc, Firestore, updateDoc} from '@angular/fire/firestore';
import { Observable } from 'rxjs';

// Interfaces
import { Header } from '../interfaces/Header.interface';
import { Footer } from '../interfaces/Footer.interface';
import { ImgLogo } from '../interfaces/ImgLogo.interface';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private firestore= inject(Firestore);

  constructor() {
  }

  // ------------------------------- Header -------------------------------
  public readHeader(): Observable<Header[]>{
    let headerRef = collection(this.firestore, 'header');
    return collectionData(headerRef) as Observable<Header[]>;
  }
  
  public updateHeader(header: any){
    let headerDocRef = doc(this.firestore, 'header/CuGFnQI1nTRETsKzztXi');
    return updateDoc(headerDocRef, header);
  }

  // ------------------------------- Footer -------------------------------
  public readFooter(): Observable<Footer[]>{
    let footerRef = collection(this.firestore, 'footer');
    return collectionData(footerRef) as Observable<Footer[]>;
  }
  
  public updateFooter(footer: any){
    let footerDocRef = doc(this.firestore, 'footer/wQLvJ9TKMfxAegawolq4');
    return updateDoc(footerDocRef, footer);
  }
  
  // ------------------------------- Logo Img ----------------------------
  public readLogoImg(): Observable<ImgLogo[]>{
    let logoRef = collection(this.firestore, 'imgLogo');
    return collectionData(logoRef) as Observable<ImgLogo[]>;
  }
  
  public updateLogoImg(imgLogo: any){
    let logoDocRef = doc(this.firestore, 'imgLogo/TazKzQxYWxnRoXqzxwlJ');
    return updateDoc(logoDocRef, imgLogo);
  }

  // ------------------------------- Sections --------------------------------
  public readSections(){
    let sec1Ref = collection(this.firestore, 'sections');
    return collectionData(sec1Ref) as Observable<any>;
  }
  
  // ------------------------------- Section 1 -------------------------------
  public updateSec1(sec1: any){
    let sec1DocRef = doc(this.firestore, 'sections/1');
    return updateDoc(sec1DocRef, sec1);
  }

  // ------------------------------- Section 2 -------------------------------
  public updateSec2(sec2: any){
    let sec2DocRef = doc(this.firestore, 'sections/2');
    return updateDoc(sec2DocRef, sec2);
  
  }

  // ------------------------------- Section 3 -------------------------------
  public updateSec3(sec3: any){
    let sec3DocRef = doc(this.firestore, 'sections/3');
    return updateDoc(sec3DocRef, sec3);
  }

  // ------------------------------- Section 4 -------------------------------
  public updateSec4(sec4: any){
    let sec4DocRef = doc(this.firestore, 'sections/4');
    return updateDoc(sec4DocRef, sec4);
  }

  // ------------------------------- Section 5 -------------------------------
  public updateSec5(sec5: any){
    let sec5DocRef = doc(this.firestore, 'sections/5');
    return updateDoc(sec5DocRef, sec5);
  }
  
}
