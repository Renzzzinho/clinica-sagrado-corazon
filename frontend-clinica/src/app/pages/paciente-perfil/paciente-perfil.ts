import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import Swal from 'sweetalert2';

import { PacienteService } from '../../services/paciente';

@Component({
  selector: 'app-paciente-perfil',

  standalone: true,

  imports: [CommonModule, FormsModule],

  templateUrl: './paciente-perfil.html',

  styleUrl: './paciente-perfil.css',
})
export class PacientePerfil implements OnInit {
  paciente: any = {};

  editando = false;

  constructor(private pacienteService: PacienteService) {}

  ngOnInit(): void {
    this.cargarPerfil();
  }

  cargarPerfil() {
    this.pacienteService

      .obtenerMiPerfil()

      .subscribe({
        next: (data: any) => {
          this.paciente = data;
        },

        error: (error) => {
          console.error(error);
        },
      });
  }

  editar() {
    this.editando = true;
  }

  cancelar() {
    this.editando = false;

    this.cargarPerfil();
  }

  guardar() {
    this.pacienteService

      .actualizarMiPerfil(this.paciente)

      .subscribe({
        next: () => {
          Swal.fire({
            icon: 'success',

            title: 'Perfil actualizado',
          });

          this.editando = false;

          this.cargarPerfil();
        },

        error: () => {
          Swal.fire({
            icon: 'error',

            title: 'Error al actualizar',
          });
        },
      });
  }
}
