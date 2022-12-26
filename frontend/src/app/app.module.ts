import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule } from '@angular/forms';

// Components
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { IndexComponent } from './components/index/index.component'
import { LoginComponent } from './components/login/login.component';
import { FooterComponent } from './components/footer/footer.component';
import { CardsPresentationComponent } from './components/index/cards-presentation/cards-presentation.component';
import { CardSection1Component } from './components/index/cards-presentation/card-section1/card-section1.component';
import { WorksComponent } from './components/index/works/works.component';
import { CoursesComponent } from './components/index/courses/courses.component';
import { CourseCardComponent } from './components/index/courses/course-card/course-card.component';
import { SkillsComponent } from './components/index/skills/skills.component';
import { ProjectsComponent } from './components/index/projects/projects.component';
import { Page404Component } from './components/page404/page404.component';

// Services
import { IndexService } from './services/index.service';
import { ItemWorkComponent } from './components/index/works/item-work/item-work.component';


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
    ProjectsComponent,
    LoginComponent,
    IndexComponent,
    Page404Component,
    CardSection1Component,
    ItemWorkComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
  ],
  providers: [
    IndexService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
