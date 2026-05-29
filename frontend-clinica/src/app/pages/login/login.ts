import { Component } from '@angular/core';

import { FormsModule } from '@angular/forms';

import { Router } from '@angular/router';

import { CommonModule } from '@angular/common';

import Swal from 'sweetalert2';

import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',

  standalone: true,

  imports: [
    FormsModule,
    CommonModule
  ],

  templateUrl: './login.html',

  styleUrl: './login.css'
})
export class Login {

  datos = {

    email: '',

    password: ''
  };

  constructor(

    private authService: AuthService,

    private router: Router

  ) {}

  login() {

    this.authService.login(this.datos)

      .subscribe({

        next: (response: any) => {

          this.authService.guardarToken(
  response.token
);

          Swal.fire({

            icon: 'success',

            title: 'Bienvenido',

            text: 'Login correcto'
          });

          setTimeout(() => {

this.router.navigate(['/home']);

}, 200);
        },

        error: () => {

          Swal.fire({

            icon: 'error',

            title: 'Error',

            text: 'Credenciales incorrectas'
          });
        }
      });
  }
}