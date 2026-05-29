import { Component, OnInit } from '@angular/core';

import { CommonModule } from '@angular/common';

import { FormsModule } from '@angular/forms';

import Swal from 'sweetalert2';

import { CitaService } from '../../services/cita';

import { DoctorService } from '../../services/doctor';

import { PacienteService } from '../../services/paciente';

@Component({
  selector: 'app-citas',

  standalone: true,

  imports: [
    CommonModule,
    FormsModule
  ],

  templateUrl: './citas.html',

  styleUrl: './citas.css'
})
export class Citas implements OnInit {

  citas: any[] = [];

  busqueda = '';

  doctores: any[] = [];

  pacientes: any[] = [];

  nuevaCita = {

    doctorId: '',

    pacienteId: '',

    fechaInicio: ''
  };

  constructor(

    private citaService: CitaService,

    private doctorService: DoctorService,

    private pacienteService: PacienteService
  ) {}

  ngOnInit(): void {

    this.cargarCitas();

    this.cargarDoctores();

    this.cargarPacientes();
  }

  cargarCitas() {

    this.citaService

      .obtenerCitas()

      .subscribe({

        next: (data: any) => {

          this.citas = data;
        }
      });
  }
  get citasFiltradas() {

  return this.citas.filter(

    (cita) =>

      cita.doctor.nombre
        .toLowerCase()

        .includes(
          this.busqueda.toLowerCase()
        )

      ||

      cita.paciente.nombre
        .toLowerCase()

        .includes(
          this.busqueda.toLowerCase()
        )

      ||

      cita.estado
        .toLowerCase()

        .includes(
          this.busqueda.toLowerCase()
        )
  );
}

  cargarDoctores() {

    this.doctorService

      .obtenerDoctores()

      .subscribe({

        next: (data: any) => {

          this.doctores = data;
        }
      });
  }

  cargarPacientes() {

    this.pacienteService

      .obtenerPacientes()

      .subscribe({

        next: (data: any) => {

          this.pacientes = data;
        }
      });
  }

  crearCita() {

    this.citaService

      .crearCita(this.nuevaCita)

      .subscribe({

        next: () => {

          Swal.fire({

            icon: 'success',

            title: 'Cita creada'
          });

          this.cargarCitas();

          this.nuevaCita = {

            doctorId: '',

            pacienteId: '',

            fechaInicio: ''
          };
        },

        error: (error) => {

          Swal.fire({

            icon: 'error',

            title: 'Error',

            text:
              error.error.message ||
              'No se pudo crear la cita'
          });
        }
      });
  }

  cancelarCita(id: number) {

    this.citaService

      .cancelarCita(id)

      .subscribe({

        next: () => {

          Swal.fire({

            icon: 'success',

            title: 'Cita cancelada'
          });

          this.cargarCitas();
        }
      });
  }

  atenderCita(id: number) {

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
}