import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';

import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CitaService {
  private API = `${environment.apiUrl}/api/citas`;

  constructor(private http: HttpClient) {}

  obtenerCitas() {
    return this.http.get(this.API);
  }

  crearCita(cita: any) {
    return this.http.post(
      this.API,

      cita,
    );
  }

  cancelarCita(id: number) {
    return this.http.put(
      `${this.API}/${id}/cancelar`,

      {},
    );
  }

  atenderCita(id: number) {
    return this.http.put(
      `${this.API}/${id}/atender`,

      {},
    );
  }



  obtenerMisCitasPaciente() {

  return this.http.get<any[]>(
    `${this.API}/mis-citas-paciente`
  );

}


obtenerMisCitasDoctor() {

  return this.http.get<any[]>(
    `${this.API}/mis-citas-doctor`
  );

}
}
