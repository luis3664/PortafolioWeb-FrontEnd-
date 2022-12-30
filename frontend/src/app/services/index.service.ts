import { Injectable, TemplateRef } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class IndexService {

  constructor() { }

  section1 = {
    // Title section
    title: "Presentation",
    // Cards
    cards: [{
        // Card 0
        title: "Personal Information",
        text1: "My name is Luis Lopez, i am 30 years old. Im Venezuelan and live in Argentina",
        text2: "Full Stack Developer Jr.",
        imgUrl: "../../../assets/PhotoPersonal.jpg",
        imgName: "Photo Personal",
      }, {
        // Card 1
        title: "Studies",
        text1: "Full Stack Developer jr. in Argentina Programa And Biologist in The University of Zulia (LUZ)",
        text2: "Learning more Languages and Frameworks",
        imgUrl: "../../../assets/LogoArgentinaPrograma.jpg",
        imgName: "Argentina Programa",
      }, {
        // Card 2
        title: "About me",
        text1: "I love science and technology, and I seek to learn more and more.",
        text2: "",
        imgUrl: "../../../assets/ImgAboutMe.jpg",
        imgName: "About Me",
      }
    ]
  }

  section2 = {
    // Title section
    title: "Works",
    works: [{
        // Item 0
        titleItem: "Personal Portfolio",
        textItem: 'Final Project of "Argentina Programa". Implementing all course knowledge (AppWeb).',
        imgUrl: "../../../assets/PorfolioAP.png",
        imgName: "Portfolio",
      },{
        // Item 1
        titleItem: "Coming Soon",
        textItem: "Full Stack Developer jr. in Argentina Programa And Biologist in The University of Zulia (LUZ)",
        imgUrl: "../../../assets/NoneProyect.png",
        imgName: "None Proyect",
      }
    ]
  }
  
  section3 = {
    // Title section
    title: "Courses and Certificates",
    courses: [{
        // Card 0
        titleCard: "Full Stack Developer Jr.",
        textCard: 'Web application developer with HTML, CSS, TypeScripts, Angular, MySQL and Spring Boot.',
        imgUrl: "...",
        imgName: "Full-Stack Course",
        dateCard: "15/01/2023",
        courseUrl: "",
      },{
        // Card 1
        titleCard: "Coming Soon",
        textCard: "Specialization Courses",
        imgUrl: "../../../assets/NoneProyect.png",
        imgName: "None Proyect",
        dateCard: "2023",
        courseUrl: "index#courses",
      }
    ]
  }

  section4 = {
    // Title Section
    titleSkill: "Hard & Soft Skills",
    topics: [
      // Topic 1
      {
        titleTopic: "Front End",
        bars: [
          //Bar 1
          {
            titleBar: "HTML",
            svg: false,
            icon: "bi bi-filetype-html",
            svgImg: "",
            valueBar: "92",
          },{
            titleBar: "CSS",
            svg: false,
            icon: "bi bi-filetype-css",
            svgImg: "",
            valueBar: "55",
          },{
            titleBar: "JavaScript",
            svg: false,
            icon: "bi bi-filetype-js",
            svgImg: "",
            valueBar: "60",
          },{
            titleBar: "TypeScript",
            svg: true,
            icon: "",
            svgImg: "../../../assets/typescriptSVG.svg",
            valueBar: "55",
          },{
            titleBar: "Bootstrap",
            svg: false,
            icon: "bi bi-bootstrap-fill",
            svgImg: "",
            valueBar: "75",
          },{
            titleBar: "Angular JS",
            svg: true,
            icon: "",
            svgImg: "../../../assets/angularjsSVG.svg",
            valueBar: "70",
          },
        ]
      },
      // Topic 2
      {
        titleTopic: "Back End",
        bars: [
          // Bar 1
          {
            titleBar: "Java",
            svg: false,
            icon: "bi bi-filetype-java",
            svgImg: "",
            valueBar: "50",
          },{
            titleBar: "MySQL",
            svg: false,
            icon: "bi bi-filetype-sql",
            svgImg: "",
            valueBar: "60",
          },{
            titleBar: "Spring Boot",
            svg: true,
            icon: "",
            svgImg: "../../../assets/springbootSVG.svg",
            valueBar: "60",
          },
        ]
      }
    ]
  }

  section5 = {
    // Title Section
    title: "Projects",
    projects: [
      {
        title: "Amber Project",
        text: "Artificial intelligence app that works as a daily assistant.",
        imgUrl: "../../../assets/AmberProject.jpg",
        imgName: "Amber Project",
      },{
        title: "Coming Soon",
        text: "Future Project.",
        imgUrl: "../../../assets/NoneProyect.png",
        imgName: "None Project",
      }
    ],
  }
}
