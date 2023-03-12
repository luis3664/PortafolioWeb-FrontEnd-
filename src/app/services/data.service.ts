import { inject, Injectable } from '@angular/core';
import { collection, collectionData, doc, Firestore, updateDoc} from '@angular/fire/firestore';
import { Observable, take } from 'rxjs';
import { HttpClient } from '@angular/common/http';

// Interfaces
import { Header } from '../interfaces/Header.interface';
import { Footer } from '../interfaces/Footer.interface';
import { ImgLogo } from '../interfaces/ImgLogo.interface';
import { Section } from '../interfaces/Section.interface';
import { Item } from '../interfaces/Item.interface';
import { Icon } from '../interfaces/Icon.interface';
import { Img } from '../interfaces/Img.interface';
import { Text } from '../interfaces/Text.interface';
import { Certificate } from '../interfaces/Certificate.interface';
import { Topic } from '../interfaces/Topic.interface';
import { Bar } from '../interfaces/Bar.interface';

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
    return this.http.put(`${this.urlApiSec}update`, sec);
  }

  // ------------------------------- Footer -------------------------------
  public readFooter(): Observable<Section>{
    return this.http.get<Section>(`${this.urlApiSec}7`);
  }
  
  public updateFooter(sec: Section){
    return this.http.put(`${this.urlApiSec}update`, sec);
  }

  // ------------------------------- Sections --------------------------------
  public readAllSec(): Observable<Section[]>{
    return this.http.get<Section[]>(`${this.urlApiSec}readAll`);
  }
  
  // ------------------------------- Section 1 -------------------------------
  public readSec1(): Observable<Section>{
    return this.http.get<Section>(`${this.urlApiSec}1`);
  }

  public updateSec1(sec1: Section){
    return this.http.put(`${this.urlApiSec}update`, sec1);
  }
  
  public setSec1Item(idItem: number){
    return this.http.put(`${this.urlApiSec}1/addItem?idItem=${idItem}`, {})
  }

  // ------------------------------- Section 2 -------------------------------
  public readSec2(): Observable<Section>{
    return this.http.get<Section>(`${this.urlApiSec}2`);
  }
  
  public updateSec2(sec2: any){
    return this.http.put(`${this.urlApiSec}update`, sec2);
  }

  public setSec2Item(idItem: number){
    return this.http.put(`${this.urlApiSec}2/addItem?idItem=${idItem}`, {})
  }

  // ------------------------------- Section 3 -------------------------------
  public readSec3(): Observable<Section>{
    return this.http.get<Section>(`${this.urlApiSec}3`);
  }

  public updateSec3(sec3: any){
    return this.http.put(`${this.urlApiSec}update`, sec3);
  }

  public setSec3Item(idItem: number){
    return this.http.put(`${this.urlApiSec}3/addItem?idItem=${idItem}`, {});
  }

  public addCertiCard(certi: Certificate){
    return this.http.post(`${this.urlApi}certificate/add`, certi);
  }
  
  public updateCertiCard(certi: Certificate){
    return this.http.put(`${this.urlApi}certificate/${certi.id}/update`, certi);
  }

  // ------------------------------- Section 4 -------------------------------
  public readSec4(): Observable<Section>{
    return this.http.get<Section>(`${this.urlApiSec}4`);
  }

  public updateSec4(sec4: any){
    return this.http.put(`${this.urlApiSec}update`, sec4);
  }

  public addTopic(topic: any){
    return this.http.post(`${this.urlApi}topic/add`, topic);
  }

  public delTopic(id: number){
    return this.http.delete(`${this.urlApi}topic/delete?id=${id}`);
  }

  public updateTopic(topic: Topic){
    return this.http.put(`${this.urlApi}topic/${topic.id}/update`, topic);
  }

  public addBar(idIcon: number, bar: Bar) {
    return this.http.post(`${this.urlApi}bar/add?idIcon=${idIcon}`, bar);
  }

  public addBarTopic(idTopic: number, idBar: number){
    return this.http.put(`${this.urlApi}topic/addBar?idTopic=${idTopic}&idBar=${idBar}`, {})
  }

  public delBar(idBar: number){
    return this.http.delete(`${this.urlApi}bar/delete?idBar=${idBar}`, {});
  }

  public updateBar(idBar: number, idIcon: number, bar: Bar){
    return this.http.put(`${this.urlApi}bar/${idBar}/update?idIcon=${idIcon}`, bar);
  }

  // ------------------------------- Section 5 -------------------------------
  public readSec5(): Observable<Section>{
    return this.http.get<Section>(`${this.urlApiSec}5`);
  }

  public updateSec5(sec5: any){
    return this.http.put(`${this.urlApiSec}update`, sec5);
  }

  public setSec5Item(idItem: number){
    return this.http.put(`${this.urlApiSec}5/addItem?idItem=${idItem}`, {})
  }

  // ------------------------------- Items -----------------------------------
  public addItem(item: Item){
    item.imgAssigned = [];
    item.textCard = {id: 0, text: ""};
    return this.http.post<Item>(`${this.urlApi}item/add`, item).pipe(take(1));
  }

  public addItemC(item: any, idImg: Number, idCertificate: Number){
    item.imgAssigned = [];
    return this.http.post<Item>(`${this.urlApi}item/addC?idCertificate=${idCertificate}&idImg=${idImg}`, item);
  }

  public addItemP(item: Item){
    return this.http.post(`${this.urlApi}item/addP`, item);
  }

  public updateItemC(item: any, idImg: Number, idCertificate: Number){
    item.imgAssigned = [];
    return this.http.put<Item>(`${this.urlApi}item/updateC?idCertificate=${idCertificate}&idImg=${idImg}`, item);
  
  }
  public updateItemP(item: Item){
    return this.http.put<Item>(`${this.urlApi}item/updateP`, item);
  }

  public readItem(id: number): Observable<Item>{
    return this.http.get<Item>(`${this.urlApi}item/${id}`);
  }
  
  public updateItem(item: Item){
    return this.http.put(`${this.urlApi}item/update`, item);
  }

  public deleteItem(id: number){
    return this.http.delete(`${this.urlApi}item/delete?id=${id}`, {});
  }

  public setItemIcon(idItem: number, idIcon: number){
    return this.http.post(`${this.urlApi}item/addIcon?idItem=${idItem}&idIcon=${idIcon}`, {})
  }

  public setItemImg(idItem: number, idImg: number){
    return this.http.put(`${this.urlApi}item/addImg?idItem=${idItem}&idImg=${idImg}`, {})
  }

  public setItemText(idItem: number, idText: number){
    console.log(`${this.urlApi}item/addText?idItem=${idItem}&idText=${idText}`);
    return this.http.put(`${this.urlApi}item/addText?idItem=${idItem}&idText=${idText}`, {})
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
    return this.http.delete(`${this.urlApi}icon/delete?id=${id}`);
  }
  
  // ------------------------------- Imagens -----------------------------------
  public addImg(img: Img){
    return this.http.post(`${this.urlApi}img/add`, img);
  }

  public addMultiImg(imgList: Array<Img>){
    let obj = {imgList}
    console.log(obj)
    return this.http.post<Array<Img>>(`${this.urlApi}img/addAll`, JSON.stringify(obj));
  }

  // ------------------------------- Text Card -----------------------------------
  public addTextC(textC: any) {
    return this.http.post(`${this.urlApi}text/add`, textC)
  }

  public deleteTextC(id: number) {
    return this.http.delete(`${this.urlApi}text/delete?id=${id}`)
  }
}
