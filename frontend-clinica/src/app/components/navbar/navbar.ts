import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-navbar',

  standalone: true,

  imports: [
    CommonModule,
    RouterLink
  ],

  templateUrl: './navbar.html',
  styleUrl: './navbar.css'
})
export class Navbar {

  constructor(
    public authService: AuthService
  ) {}

  logout() {

    this.authService.logout();
  }

  irDashboard() {

  if (this.authService.esAdmin()) {

    return '/dashboard';

  }

  if (this.authService.esDoctor()) {

    return '/doctor-home';

  }

  if (this.authService.esPaciente()) {

    return '/paciente-home';

  }

  return '/login';

}

textoInicio() {

  if (this.authService.esAdmin()) {

    return 'Dashboard';

  }

  return 'Inicio';

}
}


/*
probando
import { Component } from '@angular/core';

import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-navbar',

  standalone: true,

  imports: [RouterLink],

  templateUrl: './navbar.html',

  styleUrl: './navbar.css',
})
export class Navbar {
  constructor(private router: Router) {}

  logout() {
    localStorage.removeItem('token');

    this.router.navigate(['/login']);
  }
}
*/