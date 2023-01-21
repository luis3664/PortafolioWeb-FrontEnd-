import { inject, Injectable } from '@angular/core';
import { addDoc, collection, collectionData, deleteDoc, doc, Firestore, updateDoc} from '@angular/fire/firestore';
import { Observable } from 'rxjs';

// Interfaces
import { Section1 } from '../interfaces/Section1.interface';
import { Header } from '../interfaces/Header.interface';
import { ImgLogo } from '../interfaces/ImgLogo.interface';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private firestore= inject(Firestore);

  constructor() {
  }
  // Para Guiarme en la edicion
  // public addSection1(section1: Section1) {
  //   const section1Ref = collection(this.firestore, 'section1');
  //   return addDoc(section1Ref,section1);
  // }
  
  // public getSection1(filter= ''){
  //   const section1Ref = collection(this.firestore, 'section1');
  //   let q = query(section1Ref);
  //   if (filter) {
  //     q = query(section1Ref, where('title', '==', filter))
  //   }
  //   return collectionData(q) as unknown as Observable<Section1>;
  // }

  // Sections En proceso
  // public addSections(section: Section) {
  //   const sectionRef = collection(this.firestore, 'sections');
  //   return addDoc(sectionRef,section);
  // }

  // public getSections(){
  //   const sectionsRef = collection(this.firestore, 'sections');
  //   let q = query(sectionsRef);
  //   return collectionData(q) as unknown as Observable<Section>;
  // }

  // async updateSection(section:Section){
  //   const sectionRef = collection(this.firestore, 'section1');
  //   let q = query(sectionRef, where('id', '==', section.id));
  //   const querySnapshot = await getDocs(q);

  //   querySnapshot.forEach( async (document) => {
  //     const docRef = doc(this.firestore, 'sections', document.id);
  //    await updateDoc(docRef, {...section});
  //   })
  // }

  // async deleteSection(id: string) {
  //   const sectionRef = collection(this.firestore, 'section1');
  //   let q = query(sectionRef, where('id', '==', id));
  //   const querySnapshot = await getDocs(q);

  //   querySnapshot.forEach( async (document) => {
  //     const docRef = doc(this.firestore, 'sections', document.id);
  //    await deleteDoc(docRef);
  //   })
  // }

  // ------------------------------- Header -------------------------------
  public readHeader(): Observable<Header[]>{
    let headerRef = collection(this.firestore, 'header');
    return collectionData(headerRef, {idField: 'id'}) as Observable<Header[]>;
  }
  
  public updateHeader(header: any){
    let headerDocRef = doc(this.firestore, `header/${header.id}`);
    return updateDoc(headerDocRef, header);
  }
  
  // Logo Img
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
