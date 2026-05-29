import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PacienteService {

  private API =
    'http://localhost:8080/api/pacientes';

  constructor(
    private http: HttpClient
  ) {}

  obtenerPacientes() {

    return this.http.get(this.API);
  }

  crearPaciente(paciente: any) {

    return this.http.post(

      this.API,

      paciente
    );
  }

  eliminarPaciente(id: number) {

    return this.http.delete(

      `${this.API}/${id}`
    );
  }

  actualizarPaciente(
    id: number,
    paciente: any
  ) {

    return this.http.put(

      `${this.API}/${id}`,

      paciente
    );
  }
}