import { Component } from '@angular/core';

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
    return this.router.url !== '/login';
  }
}
