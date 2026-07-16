import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';

import { environment } from '../../environments/environment';


@Injectable({
  providedIn: 'root',
})
export class DoctorService {
  private API = `${environment.apiUrl}/api/doctores`;
  constructor(private http: HttpClient) {}

  obtenerDoctores() {
    return this.http.get(this.API);
  }

  crearDoctor(doctor: any) {
    return this.http.post(this.API, doctor);
  }
  eliminarDoctor(id: number) {
    return this.http.delete(`${this.API}/${id}`);
  }

  //para el aparttado doctor
  obtenerMiPerfil() {
    return this.http.get<any>(`${this.API}/mi-perfil`);
  }
  actualizarMiPerfil(doctor: any) {
    return this.http.put(
      `${this.API}/mi-perfil`,

      doctor,
    );
  }
  //
  actualizarDoctor(id: number, doctor: any) {
    return this.http.put(
      `${this.API}/${id}`,

      doctor,
    );
  }
}
