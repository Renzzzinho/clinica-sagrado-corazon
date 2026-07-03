import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthService } from '../../services/auth.service';
import { CitaService } from '../../services/cita';

@Component({
  selector: 'app-paciente-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './paciente-home.html'
})
export class PacienteHome implements OnInit {

  nombre = '';

  citas: any[] = [];

  totalCitas = 0;

  citasProgramadas = 0;

  citasAtendidas = 0;

  citasCanceladas = 0;

  constructor(

    private authService: AuthService,

    private citaService: CitaService

  ) {

    this.nombre = this.authService.getNombre();

  }

  ngOnInit(): void {

    this.cargarMisCitas();

  }

  cargarMisCitas() {

    this.citaService

      .obtenerMisCitasPaciente()

      .subscribe({

        next: (citas: any[]) => {

          this.citas = citas;

          this.totalCitas = citas.length;

          this.citasProgramadas = citas.filter(
            (c: any) => c.estado === 'PROGRAMADA'
          ).length;

          this.citasAtendidas = citas.filter(
            (c: any) => c.estado === 'ATENDIDA'
          ).length;

          this.citasCanceladas = citas.filter(
            (c: any) => c.estado === 'CANCELADA'
          ).length;

        }

      });

  }

}