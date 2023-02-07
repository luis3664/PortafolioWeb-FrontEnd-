import { inject, Injectable } from '@angular/core';
import { collection, collectionData, doc, Firestore, updateDoc} from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

// Interfaces
import { Header } from '../interfaces/Header.interface';
import { Footer } from '../interfaces/Footer.interface';
import { ImgLogo } from '../interfaces/ImgLogo.interface';
import { Section } from '../interfaces/Section.interface';
import { Item } from '../interfaces/Item.interface';
import { Icon } from '../interfaces/Icon.interface';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private urlApi = "http://localhost:8080/"
  private urlApiSec = "http://localhost:8080/sec/"

  private firestore= inject(Firestore);

  private http = inject(HttpClient);

  constructor() {
  }

  // ------------------------------- Header -------------------------------
  public readHeader(): Observable<Section>{
    return this.http.get<Section>(`${this.urlApiSec}6`);
  }

  public updateHeaderTitle(sec: Section): Observable<Object>{
    return this.http.put(`${this.urlApiSec}6/update`, sec);
  }

  // ------------------------------- Footer -------------------------------
  public readFooter(): Observable<Section>{
    return this.http.get<Section>(`${this.urlApiSec}7`);
  }
  
  public updateFooter(sec: Section){
    return this.http.put(`${this.urlApiSec}7/update`, sec);
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
    return this.http.get<Section[]>(`${this.urlApiSec}readAll`);
  }

  public readSections(){
    let sec1Ref = collection(this.firestore, 'sections');
    return collectionData(sec1Ref) as Observable<any>;
  }
  
  // ------------------------------- Section 1 -------------------------------
  public readSec1(): Observable<Section>{
    return this.http.get<Section>(`${this.urlApiSec}1`);
  }

  public updateSec1(sec1: any){
    let sec1DocRef = doc(this.firestore, 'sections/1');
    return updateDoc(sec1DocRef, sec1);
  }

  // ------------------------------- Section 2 -------------------------------
  public readSec2(): Observable<Section>{
    return this.http.get<Section>(`${this.urlApiSec}2`);
  }

  public updateSec2(sec2: any){
    let sec2DocRef = doc(this.firestore, 'sections/2');
    return updateDoc(sec2DocRef, sec2);
  
  }

  // ------------------------------- Section 3 -------------------------------
  public readSec3(): Observable<Section>{
    return this.http.get<Section>(`${this.urlApiSec}3`);
  }

  public updateSec3(sec3: any){
    let sec3DocRef = doc(this.firestore, 'sections/3');
    return updateDoc(sec3DocRef, sec3);
  }

  // ------------------------------- Section 4 -------------------------------
  public readSec4(): Observable<Section>{
    return this.http.get<Section>(`${this.urlApiSec}4`);
  }

  public updateSec4(sec4: any){
    let sec4DocRef = doc(this.firestore, 'sections/4');
    return updateDoc(sec4DocRef, sec4);
  }

  // ------------------------------- Section 5 -------------------------------
  public readSec5(): Observable<Section>{
    return this.http.get<Section>(`${this.urlApiSec}5`);
  }

  public updateSec5(sec5: any){
    let sec5DocRef = doc(this.firestore, 'sections/5');
    return updateDoc(sec5DocRef, sec5);
  }

  // ------------------------------- Items -----------------------------------
  public readItem(id: number): Observable<Item>{
    return this.http.get<Item>(`${this.urlApi}item/${id}`);
  }
  
  public updateItem(item: Item){
    return this.http.put(`${this.urlApi}item/update`, item);
  }

  public setItemIcon(idItem: number, idIcon: number){
    return this.http.post(`${this.urlApi}item/addIcon?idItem=${idItem}&idIcon=${idIcon}`, {})
  }
  
  public delItemIcon(idItem: number, idIcon: number){
    return this.http.delete(`${this.urlApi}item/deleteIcon?idItem=${idItem}&idIcon=${idIcon}`, {})
  }

  // ------------------------------- Icons -----------------------------------
  public addIcon(icon: any){
    return this.http.post(`${this.urlApi}icon/add`, icon);
  }

  public readIcon(id: number): Observable<Icon>{
    return this.http.get<Icon>(`${this.urlApi}icon/${id}`);
  }

  public updateIcon(icon: Icon){
    return this.http.put(`${this.urlApi}icon/update`, icon);
  }

  public delIcon(id: number){
    return this.http.delete(`${this.urlApi}icon/delete?id=${id}`)
  }

}
