import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthService } from '../../services/auth.service';
import { CitaService } from '../../services/cita';

@Component({
  selector: 'app-doctor-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './doctor-home.html',
  styleUrl: './doctor-home.css',
})
export class DoctorHome implements OnInit {
  nombre = '';

  totalCitas = 0;

  citasProgramadas = 0;

  citasAtendidas = 0;

  citasCanceladas = 0;

  constructor(
    private authService: AuthService,
    private citaService: CitaService,
  ) {}

  ngOnInit(): void {
    this.nombre = this.authService.getNombre();

    this.cargarResumen();
  }

  cargarResumen() {
    this.citaService

      .obtenerMisCitasDoctor()

      .subscribe({
        next: (citas: any[]) => {
          this.totalCitas = citas.length;

          this.citasProgramadas = citas.filter((c: any) => c.estado === 'PROGRAMADA').length;

          this.citasAtendidas = citas.filter((c: any) => c.estado === 'ATENDIDA').length;
          this.citasCanceladas = citas.filter((c: any) => c.estado === 'CANCELADA').length;
        },

        error: (error) => {
          console.error(error);
        },
      });
  }
}

/*import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-doctor-home',
  standalone: true,
  templateUrl: './doctor-home.html'
})
export class DoctorHome {

  nombre = '';

  constructor(
    private authService: AuthService
  ) {

    this.nombre =
      this.authService.getNombre();
  }
}
  
anterior
*/
