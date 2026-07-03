import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';

import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private API = 'http://localhost:8080/auth';

  private timeoutId: any;

  constructor(
    private http: HttpClient,

    private router: Router,
  ) {}

  login(datos: any) {
    return this.http.post(`${this.API}/login`, datos);
  }

  guardarToken(token: string, nombre?: string, rol?: string) {
    localStorage.setItem('token', token);

    if (nombre) {
      localStorage.setItem('nombre', nombre);
    }

    if (rol) {
      localStorage.setItem('rol', rol);
    }

    this.iniciarTemporizador(token);
  }
  getRol(): string {
    return localStorage.getItem('rol') || '';
  }

  getNombre(): string {
    return localStorage.getItem('nombre') || '';
  }

  esAdmin(): boolean {
    return this.getRol() === 'ADMIN';
  }

  esDoctor(): boolean {
    return this.getRol() === 'DOCTOR';
  }

  esPaciente(): boolean {
    return this.getRol() === 'PACIENTE';
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('rol');
    localStorage.removeItem('nombre');

    if (this.timeoutId) {
      clearTimeout(this.timeoutId);
    }

    this.router.navigate(['/login']);
  }

  iniciarTemporizador(token: string) {
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));

      const expiracion = payload.exp * 1000;

      const tiempoRestante = expiracion - Date.now();

      if (tiempoRestante <= 0) {
        this.logout();

        return;
      }

      this.timeoutId = setTimeout(() => {
        alert('Sesión expirada');

        this.logout();
      }, tiempoRestante);
    } catch (error) {
      this.logout();
    }
  }

  verificarSesion() {
    const token = localStorage.getItem('token');

    if (token) {
      this.iniciarTemporizador(token);
    }
  }
}
