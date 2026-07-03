import { Component, OnInit } from '@angular/core';

import { CommonModule } from '@angular/common';

import { FormsModule } from '@angular/forms';

import Swal from 'sweetalert2';

import { PacienteService } from '../../services/paciente';

@Component({
  selector: 'app-pacientes',

  standalone: true,

  imports: [CommonModule, FormsModule],

  templateUrl: './pacientes.html',

  styleUrl: './pacientes.css',
})
export class Pacientes implements OnInit {
  pacientes: any[] = [];

  busqueda = '';

  nuevoPaciente = {
    nombre: '',

    dni: '',

    email: '',

    telefono: '',

    direccion: '',

    fechaNacimiento: '',

    password: '',
  };

  pacienteEditando: any = null;

  constructor(private pacienteService: PacienteService) {}

  ngOnInit(): void {
    this.cargarPacientes();
  }

  cargarPacientes() {
    this.pacienteService

      .obtenerPacientes()

      .subscribe({
        next: (data: any) => {
          this.pacientes = data;
        },

        error: (error) => {
          console.error(error);
        },
      });
  }

  get pacientesFiltrados() {
    return this.pacientes.filter(
      (paciente) =>
        paciente.nombre
          ?.toLowerCase()

          .includes(this.busqueda.toLowerCase()) ||
        paciente.email
          ?.toLowerCase()

          .includes(this.busqueda.toLowerCase()) ||
        paciente.dni
          ?.toString()

          .toLowerCase()

          .includes(this.busqueda.toLowerCase()),
    );
  }

  crearPaciente() {
    if (
      !this.nuevoPaciente.nombre ||
      !this.nuevoPaciente.dni ||
      !this.nuevoPaciente.email ||
      !this.nuevoPaciente.telefono ||
      !this.nuevoPaciente.direccion ||
      !this.nuevoPaciente.fechaNacimiento||
      !this.nuevoPaciente.password
    ) {
      Swal.fire({
        icon: 'warning',

        title: 'Completa todos los campos',
      });

      return;
    }
    const emailValido = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

if (!emailValido.test(this.nuevoPaciente.email)) {

  Swal.fire({

    icon: 'warning',

    title: 'Email inválido',
  });

  return;
}

if (this.nuevoPaciente.dni.length !== 8) {

  Swal.fire({

    icon: 'warning',

    title: 'DNI inválido',
  });

  return;
}

if (this.nuevoPaciente.telefono.length < 9) {

  Swal.fire({

    icon: 'warning',

    title: 'Teléfono inválido',
  });

  return;
}

if (this.nuevoPaciente.nombre.length < 3) {

  Swal.fire({

    icon: 'warning',

    title: 'Nombre demasiado corto',
  });

  return;
}
if (this.nuevoPaciente.password.length < 6) {

  Swal.fire({

    icon: 'warning',

    title: 'La contraseña debe tener al menos 6 caracteres',

  });

  return;

}

const fechaNacimiento = new Date(this.nuevoPaciente.fechaNacimiento);

const hoy = new Date();

if (fechaNacimiento > hoy) {

  Swal.fire({

    icon: 'warning',

    title: 'Fecha de nacimiento inválida',
  });

  return;
}

    this.pacienteService

      .crearPaciente(this.nuevoPaciente)

      .subscribe({
        next: (pacienteCreado: any) => {
          Swal.fire({
            icon: 'success',

            title: 'Paciente creado',
          });

          this.pacientes = [...this.pacientes, pacienteCreado];

          this.nuevoPaciente = {
            nombre: '',

            dni: '',

            email: '',

            telefono: '',

            direccion: '',

            fechaNacimiento: '',

            password: '',
          };
        },

        error: () => {
          Swal.fire({
            icon: 'error',

            title: 'Error al crear paciente',
          });
        },
      });
  }

  eliminarPaciente(id: number) {
    Swal.fire({
      title: '¿Eliminar paciente?',

      icon: 'warning',

      showCancelButton: true,

      confirmButtonText: 'Sí, eliminar',
    })

      .then((result) => {
        if (result.isConfirmed) {
          this.pacienteService

            .eliminarPaciente(id)

            .subscribe({
              next: () => {
                this.pacientes = this.pacientes.filter((paciente) => paciente.id !== id);

                Swal.fire({
                  icon: 'success',

                  title: 'Paciente eliminado',
                });
              },
            });
        }
      });
  }

  editarPaciente(paciente: any) {
    this.pacienteEditando = {
      ...paciente,
    };
  }

  guardarEdicion() {
    this.pacienteService

      .actualizarPaciente(
        this.pacienteEditando.id,

        this.pacienteEditando,
      )

      .subscribe({
        next: () => {
          const index = this.pacientes.findIndex((p) => p.id === this.pacienteEditando.id);

          this.pacientes[index] = {
            ...this.pacienteEditando,
          };

          this.pacienteEditando = null;

          Swal.fire({
            icon: 'success',

            title: 'Paciente actualizado',
          });
        },
      });
  }
}
