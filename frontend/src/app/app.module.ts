import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';

// Components
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { IndexComponent } from './components/index/index.component'
import { LoginComponent } from './components/login/login.component';
import { FooterComponent } from './components/footer/footer.component';
import { CardsPresentationComponent } from './components/cards-presentation/cards-presentation.component';
import { WorksComponent } from './components/works/works.component';
import { CoursesComponent } from './components/courses/courses.component';
import { SkillsComponent } from './components/skills/skills.component';
import { ProjectsComponent } from './components/projects/projects.component';
import { CourseCardComponent } from './components/index/courses/course-card/course-card.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    CardsPresentationComponent,
    WorksComponent,
    CoursesComponent,
    SkillsComponent,
    ProjectsComponent,
    LoginComponent,
    IndexComponent,
    CourseCardComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
