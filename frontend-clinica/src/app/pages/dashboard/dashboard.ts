import { Component, OnInit, AfterViewInit } from '@angular/core';

import { CommonModule } from '@angular/common';

import { DoctorService } from '../../services/doctor';

import { PacienteService } from '../../services/paciente';

import { CitaService } from '../../services/cita';

import { Chart, registerables } from 'chart.js';

Chart.register(...registerables);

@Component({
  selector: 'app-dashboard',

  standalone: true,

  imports: [CommonModule],

  templateUrl: './dashboard.html',

  styleUrls: ['./dashboard.css'],
})
export class Dashboard implements OnInit, AfterViewInit {
  totalDoctores = 0;

  totalPacientes = 0;

  totalCitas = 0;

  citasAtendidas = 0;

  citasCanceladas = 0;

  citasProgramadas = 0;

  chart: any;

  constructor(
    private doctorService: DoctorService,

    private pacienteService: PacienteService,

    private citaService: CitaService,
  ) {}

  ngOnInit(): void {
    this.cargarDashboard();
  }

  ngAfterViewInit(): void {
    this.crearGrafico();
  }

  cargarDashboard() {
    this.doctorService

      .obtenerDoctores()

      .subscribe({
        next: (data: any) => {
          this.totalDoctores = data.length;
        },
      });

    this.pacienteService

      .obtenerPacientes()

      .subscribe({
        next: (data: any) => {
          this.totalPacientes = data.length;
        },
      });

    this.citaService

      .obtenerCitas()

      .subscribe({
        next: (data: any) => {
          this.totalCitas = data.length;

          this.citasAtendidas = data.filter((c: any) => c.estado === 'ATENDIDA').length;

          this.citasCanceladas = data.filter((c: any) => c.estado === 'CANCELADA').length;

          this.citasProgramadas = data.filter((c: any) => c.estado === 'PROGRAMADA').length;

          this.actualizarGrafico();
        },
      });
  }

  crearGrafico() {
    this.chart = new Chart('graficoCitas', {
      type: 'doughnut',

      data: {
        labels: ['Programadas', 'Atendidas', 'Canceladas'],

        datasets: [
          {
            data: [this.citasProgramadas, this.citasAtendidas, this.citasCanceladas],
          },
        ],
      },

      options: {
        responsive: true,

        maintainAspectRatio: false,
      },
    });
  }

  actualizarGrafico() {
    if (this.chart) {
      this.chart.data.datasets[0].data = [
        this.citasProgramadas,

        this.citasAtendidas,

        this.citasCanceladas,
      ];

      this.chart.update();
    }
  }
}
