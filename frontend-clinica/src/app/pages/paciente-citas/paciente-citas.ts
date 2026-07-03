import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

import Swal from 'sweetalert2';

import { CitaService } from '../../services/cita';

@Component({
  selector: 'app-paciente-citas',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './paciente-citas.html',
  styleUrl: './paciente-citas.css',
})
export class PacienteCitas implements OnInit {
  citas: any[] = [];

  constructor(private citaService: CitaService) {}

  ngOnInit(): void {
    this.cargarCitas();
  }

  cargarCitas() {
    this.citaService

      .obtenerMisCitasPaciente()

      .subscribe({
        next: (data: any[]) => {
          this.citas = data;
        },

        error: (error) => {
          console.error(error);
        },
      });
  }

}
