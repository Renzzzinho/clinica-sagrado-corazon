import { Routes } from '@angular/router';

import { Landing } from './pages/landing/landing';
import { Login } from './pages/login/login';
/*import { Home } from './pages/home/home';*/
import { Doctores } from './pages/doctores/doctores';
import { Pacientes } from './pages/pacientes/pacientes';
import { Citas } from './pages/citas/citas';

import { authGuard } from './guards/auth-guard';
import { Dashboard } from './pages/dashboard/dashboard';

//ultimos agragados
import { DoctorHome } from './pages/doctor-home/doctor-home';
import { PacienteHome } from './pages/paciente-home/paciente-home';

import { DoctorCitas } from './pages/doctor-citas/doctor-citas';
import { DoctorPerfil } from './pages/doctor-perfil/doctor-perfil';

import { PacienteCitas } from './pages/paciente-citas/paciente-citas';
import { PacientePerfil } from './pages/paciente-perfil/paciente-perfil';

//

export const routes: Routes = [
  {
    path: '',
    component: Landing,
  },

  {
    path: 'login',
    component: Login,
  },

  {
    path: 'dashboard',
    component: Dashboard,
    canActivate: [authGuard],
  },

  {
  path: 'doctor-citas',
  component: DoctorCitas,
  canActivate: [authGuard],
},

{
  path: 'doctor-perfil',
  component: DoctorPerfil,
  canActivate: [authGuard],
},

{
  path: 'paciente-citas',
  component: PacienteCitas,
  canActivate: [authGuard],
},

{
  path: 'paciente-perfil',
  component: PacientePerfil,
  canActivate: [authGuard],
},

  {
    path: 'doctores',
    component: Doctores,
    canActivate: [authGuard],
  },

  {
    path: 'pacientes',
    component: Pacientes,
    canActivate: [authGuard],
  },

  {
    path: 'citas',
    component: Citas,
    canActivate: [authGuard],
  },

{
    path: 'doctor-home',
    component: DoctorHome,
    canActivate: [authGuard],
  },

  {
    path: 'paciente-home',
    component: PacienteHome,
    canActivate: [authGuard],
  },


  


  {
    path: '**',
    redirectTo: '',
  },

  
];
