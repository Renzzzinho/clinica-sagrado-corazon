import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';

import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PacienteService {

  private API =
    `${environment.apiUrl}/api/pacientes`;

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

  obtenerMiPerfil() {

  return this.http.get<any>(
    `${this.API}/mi-perfil`
  );

}

actualizarMiPerfil(paciente: any) {

  return this.http.put(

    `${this.API}/mi-perfil`,

    paciente

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