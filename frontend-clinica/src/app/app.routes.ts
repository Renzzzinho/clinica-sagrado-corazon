import { Routes } from '@angular/router';

import { Login } from './pages/login/login';

import { Home } from './pages/home/home';

import { Doctores } from './pages/doctores/doctores';

import { Pacientes } from './pages/pacientes/pacientes';

import { Citas } from './pages/citas/citas';

import { Dashboard } from './pages/dashboard/dashboard';

import { authGuard } from './guards/auth-guard';

export const routes: Routes = [
  {
    path: '',

    component: Dashboard,

    canActivate: [authGuard],
  },

  {
    path: 'login',

    component: Login,
  },

  {
    path: 'home',

    component: Home,

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
    path: '**',

    redirectTo: '',
  },
];
