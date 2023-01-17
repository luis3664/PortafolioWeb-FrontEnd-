import { inject, Injectable } from '@angular/core';
import { addDoc, collection, collectionData, deleteDoc, doc, Firestore, getDocs, query, updateDoc, where} from '@angular/fire/firestore';
import { Observable } from 'rxjs';

// Interfaces
import { Section1 } from '../interfaces/Section1.interface';
import { Section } from '../interfaces/Section.interface';
import { Header } from '../interfaces/Header.interface';
import { ImgLogo } from '../interfaces/ImgLogo';
import { Logos } from '../interfaces/Logos';

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

  // Header
  public readHeader(): Observable<Header[]>{
    const headerRef = collection(this.firestore, 'header');
    return collectionData(headerRef, {idField: 'id'}) as Observable<Header[]>;
  }

  public updateHeader(header: any){
    const headerDocRef = doc(this.firestore, `header/${header.id}`);
    return updateDoc(headerDocRef, header);
  }

  // Logo Img
  public readLogoImg(): Observable<ImgLogo[]>{
    const logoRef = collection(this.firestore, 'imgLogo');
    return collectionData(logoRef) as Observable<ImgLogo[]>;
  }

  public updateLogoImg(imgLogo: any){
    const logoDocRef = doc(this.firestore, 'imgLogo/TazKzQxYWxnRoXqzxwlJ');
    return updateDoc(logoDocRef, imgLogo);
  }

}
