import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// Components
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { IndexComponent } from './components/index/index.component'
import { LoginComponent } from './components/login/login.component';
import { FooterComponent } from './components/footer/footer.component';
import { CardsPresentationComponent } from './components/index/cards-presentation/cards-presentation.component';
import { CardSection1Component } from './components/index/cards-presentation/card-section1/card-section1.component';
import { WorksComponent } from './components/index/works/works.component';
import { ItemWorkComponent } from './components/index/works/item-work/item-work.component';
import { CoursesComponent } from './components/index/courses/courses.component';
import { CourseCardComponent } from './components/index/courses/course-card/course-card.component';
import { SkillsComponent } from './components/index/skills/skills.component';
import { TopicsComponent } from './components/index/skills/topics/topics.component';
import { ProjectsComponent } from './components/index/projects/projects.component';
import { Page404Component } from './components/page404/page404.component';

// Services
import { IndexService } from './services/index.service';
import { ProjectComponent } from './components/index/projects/project/project.component';
import { initializeApp,provideFirebaseApp } from '@angular/fire/app';
import { environment } from '../environments/environment';
import { provideAuth,getAuth } from '@angular/fire/auth';
import { provideDatabase,getDatabase } from '@angular/fire/database';
import { DataService } from './services/data.service';
import { provideFirestore, getFirestore } from '@angular/fire/firestore';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    CardsPresentationComponent,
    WorksComponent,
    CoursesComponent,
    CourseCardComponent,
    SkillsComponent,
    TopicsComponent,
    ProjectsComponent,
    LoginComponent,
    IndexComponent,
    Page404Component,
    CardSection1Component,
    ItemWorkComponent,
    ProjectComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideFirestore(() => getFirestore()),
    provideAuth(() => getAuth()),
    provideDatabase(() => getDatabase()),
  ],
  providers: [
    IndexService,
    DataService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
