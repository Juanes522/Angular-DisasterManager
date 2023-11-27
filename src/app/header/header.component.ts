import { Component, OnInit, Inject, inject } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit{

  constructor(private router: Router,@Inject(DOCUMENT) private document: Document){}

  ngOnInit(): void {

    if(this.router.url === '/register' || this.router.url === '/login' || this.router.url === '/registerinvestigator'){
      this.document.body.style.backgroundColor = 'darkcyan';
    }else{
      this.document.body.style.backgroundColor = 'white';
    }

    this.router.events.subscribe((event)=>{
      if(event instanceof NavigationEnd){
        if(this.router.url === '/register' || this.router.url === '/login' || this.router.url === '/registerinvestigator'){
          this.document.body.style.backgroundColor = 'darkcyan';
        }
        else{
          this.document.body.style.backgroundColor = 'white';
        }
      }
    })
  }

  showMenu = false;

  controllMenu(){
    this.showMenu = true;
  }

  closeMenu = true;

  controllCloseMenu(){
    this.showMenu = false;
  }

}
