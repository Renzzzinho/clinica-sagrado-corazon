import { Component, OnInit } from '@angular/core';

import { CommonModule } from '@angular/common';

import { FormsModule } from '@angular/forms';

import Swal from 'sweetalert2';

import { DoctorService } from '../../services/doctor';



@Component({
  selector: 'app-doctores',

  standalone: true,

  imports: [CommonModule, FormsModule],

  templateUrl: './doctores.html',

  styleUrl: './doctores.css',
})
export class Doctores implements OnInit {
  doctores: any[] = [];

  busqueda = '';

  nuevoDoctor = {
    nombre: '',

    especialidad: '',

    email: '',

    telefono: '',

    password: '',
  };

  doctorEditando: any = null;

  constructor(private doctorService: DoctorService) {}

  ngOnInit(): void {
    this.cargarDoctores();
  }

  cargarDoctores() {
    
    this.doctorService

      .obtenerDoctores()

      .subscribe({
        next: (data: any) => {
          this.doctores = data;
        },

        error: (error) => {
          console.error(error);
        },
      });
  }

  get doctoresFiltrados() {
    return this.doctores.filter(
      (doctor) =>
        doctor.nombre
          .toLowerCase()

          .includes(this.busqueda.toLowerCase()) ||
        doctor.especialidad
          .toLowerCase()

          .includes(this.busqueda.toLowerCase()),
    );
  }

  crearDoctor() {
    if (
      !this.nuevoDoctor.nombre ||
      !this.nuevoDoctor.especialidad ||
      !this.nuevoDoctor.email ||
      !this.nuevoDoctor.telefono ||
      !this.nuevoDoctor.password
    ) {
      Swal.fire({
        icon: 'warning',

        title: 'Campos obligatorios',

        text: 'Completa todos los campos',
      });

      return;
    }

    const emailValido = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailValido.test(this.nuevoDoctor.email)) {
      Swal.fire({
        icon: 'warning',

        title: 'Email inválido',
      });

      return;
    }

    if (this.nuevoDoctor.telefono.length < 9) {
      Swal.fire({
        icon: 'warning',

        title: 'Teléfono inválido',
      });

      return;
    }

    if (this.nuevoDoctor.password.length < 6) {

  Swal.fire({
    icon: 'warning',
    title: 'Contraseña muy corta',
    text: 'Debe tener al menos 6 caracteres'
  });

  return;
}

    if (this.nuevoDoctor.nombre.length < 3) {
      Swal.fire({
        icon: 'warning',

        title: 'Nombre demasiado corto',
      });

      return;

    }

    this.doctorService

      .crearDoctor(this.nuevoDoctor)

      .subscribe({
        next: (doctorCreado: any) => {
          Swal.fire({
            icon: 'success',

            title: 'Doctor creado correctamente',
          });

          this.doctores = [...this.doctores, doctorCreado];

          this.nuevoDoctor = {
            nombre: '',

            especialidad: '',

            email: '',

            telefono: '',

            password: '',
          };
        },

        error: (error) => {
          console.error(error);

          Swal.fire({
            icon: 'error',

            title: 'Error al crear doctor',
          });
        },
      });
  }

  eliminarDoctor(id: number) {
    Swal.fire({
      title: '¿Eliminar doctor?',

      icon: 'warning',

      showCancelButton: true,

      confirmButtonText: 'Sí, eliminar',
    })

      .then((result) => {
        if (result.isConfirmed) {
          this.doctorService

            .eliminarDoctor(id)

            .subscribe({
              next: () => {
                Swal.fire({
                  icon: 'success',

                  title: 'Doctor eliminado',
                });

                this.doctores = this.doctores.filter((doctor) => doctor.id !== id);
              },

              error: () => {
                Swal.fire({
                  icon: 'error',

                  title: 'Error al eliminar',
                });
              },
            });
        }
      });
  }

  editarDoctor(doctor: any) {
    this.doctorEditando = {
      ...doctor,
    };
  }

  guardarEdicion() {
    this.doctorService

      .actualizarDoctor(
        this.doctorEditando.id,

        this.doctorEditando,
      )

      .subscribe({
        next: () => {
          Swal.fire({
            icon: 'success',

            title: 'Doctor actualizado',
          });

          const index = this.doctores.findIndex((d) => d.id === this.doctorEditando.id);

          this.doctores[index] = {
            ...this.doctorEditando,
          };

          this.doctorEditando = null;
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
