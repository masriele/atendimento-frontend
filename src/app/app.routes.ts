import { Routes } from '@angular/router';
import { AgendamentoFormComponent } from './pages/agendamento/agendamento-form/agendamento-form.component';

export const routes: Routes = [
  {
    path: 'agendamentos',
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
  { path: '', redirectTo: '/agendamentos', pathMatch: 'full' },
];
