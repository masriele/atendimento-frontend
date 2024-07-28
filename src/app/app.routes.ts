import { Routes } from '@angular/router';
import { AgendamentoFormComponent } from './pages/agendamento/agendamento-form/agendamento-form.component';
import { UsuarioEntrarComponent } from './pages/usuario/usuario-entrar/usuario-entrar.component';
import { UsuarioCriarComponent } from './pages/usuario/usuario-criar/usuario-criar.component';
import { AuthGuard } from './services/auth-guard';
import { AtendenteFormComponent } from './pages/atendente/atendente-form/atendente-form.component';
import { PacienteFormComponent } from './pages/paciente/paciente-form/paciente-form.component';
import { ServicoFormComponent } from './pages/servico/servico-form/servico-form.component';
import { DataSemanaFormComponent } from './pages/servico/data-semana-form/data-semana-form.component';

export const routes: Routes = [
  {
    path: 'agendamentos',
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        loadComponent: () =>
          import(
            './pages/agendamento/agendamento-list/agendamento-list.component'
          ).then((m) => m.AgendamentoListComponent),
      },
      { path: 'new', component: AgendamentoFormComponent },
      { path: ':id/edit', component: AgendamentoFormComponent },
    ],
  },
  {
    path: 'pacientes',
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        loadComponent: () =>
          import(
            './pages/paciente/paciente-list/paciente-list.component'
          ).then((m) => m.PacienteListComponent),
      },
      { path: 'new', component: PacienteFormComponent },
      { path: ':id/edit', component: PacienteFormComponent },
    ],
  },
  {
    path: 'atendentes',
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        loadComponent: () =>
          import(
            './pages/atendente/atendente-list/atendente-list.component'
          ).then((m) => m.AtendenteListComponent),
      },
      { path: 'new', component: AtendenteFormComponent },
      { path: ':id/edit', component: AtendenteFormComponent },
    ],
  },
  {
    path: 'servicos',
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        loadComponent: () =>
          import(
            './pages/servico/servico-list/servico-list.component'
          ).then((m) => m.ServicoListComponent),
      },
      { path: 'new', component: ServicoFormComponent },
      { path: ':id/edit', component: ServicoFormComponent },
      { path: 'newData', component: DataSemanaFormComponent },
    ],
  },
  {
    path: 'usuarios',
    children: [
      { path: 'entrar', component: UsuarioEntrarComponent },
      { path: 'criar', component: UsuarioCriarComponent },
    ],
  },
  { path: '', redirectTo: '/usuarios/entrar', pathMatch: 'full' },
];
