import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import Swal from 'sweetalert2';

import { DoctorService } from '../../services/doctor';

@Component({
  selector: 'app-doctor-perfil',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule
  ],
  templateUrl: './doctor-perfil.html',
  styleUrl: './doctor-perfil.css'
})
export class DoctorPerfil implements OnInit {

  doctor: any = {};

  editando = false;

  constructor(
    private doctorService: DoctorService
  ) {}

  ngOnInit(): void {

    this.cargarPerfil();

  }

  cargarPerfil() {

    this.doctorService

      .obtenerMiPerfil()

      .subscribe({

        next: (data: any) => {

          this.doctor = data;

        },

        error: (error) => {

          console.error(error);

        }

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

    this.doctorService

      .actualizarMiPerfil(this.doctor)

      .subscribe({

        next: () => {

          Swal.fire({

            icon: 'success',

            title: 'Perfil actualizado'

          });

          this.editando = false;

          this.cargarPerfil();

        },

        error: () => {

          Swal.fire({

            icon: 'error',

            title: 'Error al actualizar'

          });

        }

      });

  }

}