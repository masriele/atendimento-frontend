import { Routes } from '@angular/router';
import { AgendamentoFormComponent } from './pages/agendamento/agendamento-form/agendamento-form.component';
import { UsuarioEntrarComponent } from './pages/usuario/usuario-entrar/usuario-entrar.component';
import { UsuarioCriarComponent } from './pages/usuario/usuario-criar/usuario-criar.component';
import { AuthGuard } from './services/auth-guard';

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
    path: 'usuarios',
    children: [
      { path: 'entrar', component: UsuarioEntrarComponent },
      { path: 'criar', component: UsuarioCriarComponent },
    ],
  },
  { path: '', redirectTo: '/usuarios/entrar', pathMatch: 'full' },
];
