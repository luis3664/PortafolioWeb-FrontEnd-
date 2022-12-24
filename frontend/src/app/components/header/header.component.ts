import { Component } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})

export class HeaderComponent {

  // Logo
  logoImg: String = "../../../assets/logo.png";
  logoTitle: String = "Luis Lopez - Full Stack Developer Jr.";
  // Tittles Menu
  titleCardsPresentation: String = "Presentation";
  titleWork: String = "Works";
  titleCourses: String = "Courses and Certificates";
  titleSkills: String = "Hard & Soft Skills";
  titleProjects: String = "Projects";

  displayLink: boolean = true;
  
  constructor () {}

  ngOnInit(): void {

    if(window.location.pathname == '/login'){
      this.displayLink = false;
    }

  }
}