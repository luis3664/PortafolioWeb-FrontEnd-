import { Component } from '@angular/core';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})

export class HeaderComponent {

  displayLink: boolean = true;
  
  ngOnInit(): void {

    if(window.location.pathname == '/login'){
      this.displayLink = false;
    }

  }
}