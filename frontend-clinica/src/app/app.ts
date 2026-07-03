import { Component, OnInit } from '@angular/core';

import { RouterOutlet, Router, NavigationEnd } from '@angular/router';

import { Navbar } from './components/navbar/navbar';

import AOS from 'aos';

@Component({
  selector: 'app-root',

  standalone: true,

  imports: [RouterOutlet, Navbar],

  templateUrl: './app.html',

  styleUrl: './app.css',
})
export class App implements OnInit {
  mostrarSidebar = false;

  constructor(private router: Router) {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        const rutasPublicas = ['/', '/login'];

        this.mostrarSidebar = !rutasPublicas.includes(event.urlAfterRedirects);
      }
    });
  }

  ngOnInit(): void {
    AOS.init({
      duration: 1000,

      once: true,
    });
  }
}

/*import { Component } from '@angular/core';

import { RouterOutlet, Router } from '@angular/router';

import { Navbar } from './components/navbar/navbar';

@Component({
  selector: 'app-root',

  standalone: true,

  imports: [RouterOutlet, Navbar],

  templateUrl: './app.html',

  styleUrl: './app.css',
})
export class App {
  constructor(private router: Router) {}

  mostrarNavbar(): boolean {
    const rutasPublicas = ['/', '/login'];

    return !rutasPublicas.includes(this.router.url);
  }
}*/
