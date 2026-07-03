import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

import Swal from 'sweetalert2';

import { CitaService } from '../../services/cita';

@Component({
  selector: 'app-doctor-citas',

  standalone: true,

  imports: [CommonModule],

  templateUrl: './doctor-citas.html',

  styleUrl: './doctor-citas.css',
})
export class DoctorCitas implements OnInit {

  citas: any[] = [];

  constructor(
    private citaService: CitaService
  ) {}

  ngOnInit(): void {

    this.cargarCitas();

  }

  cargarCitas() {

    this.citaService

      .obtenerMisCitasDoctor()

      .subscribe({

        next: (data: any[]) => {

          this.citas = data;

        },

        error: (error) => {

          console.error(error);

        }

      });

  }

  atender(id: number) {

    Swal.fire({

      title: '¿Marcar cita como atendida?',

      icon: 'question',

      showCancelButton: true,

      confirmButtonText: 'Sí'

    })  

    .then(result => {

      if(result.isConfirmed){

        this.citaService

          .atenderCita(id)

          .subscribe({

            next: () => {

              Swal.fire({

                icon: 'success',

                title: 'Cita atendida'

              });

              this.cargarCitas();

            }

          });

      }

    });

  }

}