import { inject, Injectable } from '@angular/core';
import { collection, collectionData, doc, Firestore, updateDoc} from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

// Interfaces
import { Header } from '../interfaces/Header.interface';
import { Footer } from '../interfaces/Footer.interface';
import { ImgLogo } from '../interfaces/ImgLogo.interface';
import { Section } from '../interfaces/Section.interface';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private urlApi = "http://localhost:8080/sec/"

  private firestore= inject(Firestore);

  private http = inject(HttpClient);

  constructor() {
  }

  // ------------------------------- Header -------------------------------
  public readHeader(): Observable<Section>{
    return this.http.get<Section>(`${this.urlApi}6`);
  }

  public updateHeaderTitle(sec: Section): Observable<Object>{
    return this.http.put(`${this.urlApi}6/update`, sec);
  }

  // ------------------------------- Footer -------------------------------
  public readFooter2(): Observable<Section>{
    return this.http.get<Section>(`${this.urlApi}7`);
  }

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
  public readAllSec(): Observable<Section[]>{
    return this.http.get<Section[]>(`${this.urlApi}readAll`);
  }

  public readSections(){
    let sec1Ref = collection(this.firestore, 'sections');
    return collectionData(sec1Ref) as Observable<any>;
  }
  
  // ------------------------------- Section 1 -------------------------------
  public readSec1(): Observable<Section>{
    return this.http.get<Section>(`${this.urlApi}1`);
  }

  public updateSec1(sec1: any){
    let sec1DocRef = doc(this.firestore, 'sections/1');
    return updateDoc(sec1DocRef, sec1);
  }

  // ------------------------------- Section 2 -------------------------------
  public readSec2(): Observable<Section>{
    return this.http.get<Section>(`${this.urlApi}2`);
  }

  public updateSec2(sec2: any){
    let sec2DocRef = doc(this.firestore, 'sections/2');
    return updateDoc(sec2DocRef, sec2);
  
  }

  // ------------------------------- Section 3 -------------------------------
  public readSec3(): Observable<Section>{
    return this.http.get<Section>(`${this.urlApi}3`);
  }

  public updateSec3(sec3: any){
    let sec3DocRef = doc(this.firestore, 'sections/3');
    return updateDoc(sec3DocRef, sec3);
  }

  // ------------------------------- Section 4 -------------------------------
  public readSec4(): Observable<Section>{
    return this.http.get<Section>(`${this.urlApi}4`);
  }

  public updateSec4(sec4: any){
    let sec4DocRef = doc(this.firestore, 'sections/4');
    return updateDoc(sec4DocRef, sec4);
  }

  // ------------------------------- Section 5 -------------------------------
  public readSec5(): Observable<Section>{
    return this.http.get<Section>(`${this.urlApi}5`);
  }

  public updateSec5(sec5: any){
    let sec5DocRef = doc(this.firestore, 'sections/5');
    return updateDoc(sec5DocRef, sec5);
  }
  
}
