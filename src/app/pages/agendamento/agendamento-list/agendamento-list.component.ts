import { Component } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { AsyncPipe } from '@angular/common';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { AuthService } from '../../../services/auth.service';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { Dialog } from '../../../components/dialog/dialog.component';
import { AgendamentoService } from '../../../services/agendamento.service';
import { Agendamento } from '../../../models/agendamento';

@Component({
  selector: 'app-agendamento-list',
  standalone: true,
  imports: [
    MatTableModule,
    AsyncPipe,
    MatSnackBarModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatDividerModule,
    MatPaginatorModule,
  ],
  templateUrl: './agendamento-list.component.html',
  styleUrl: './agendamento-list.component.css',
})
export class AgendamentoListComponent {
  agendamentos$: any;
  agendamentos_array: Agendamento[] = [];
  displayedColumns = [
    'paciente',
    'atendente',
    'servico',
    'dia',
    'horario',
    'acao',
  ];

  pageIndex = 0;
  pageSize = 10;

  constructor(
    public _snackBar: MatSnackBar,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    public dialog: MatDialog,
    private service: AgendamentoService,
    private auth: AuthService
  ) {
    auth.login('jose@gmail.com', '1234').subscribe();
    this.getDataPaginated({
      pageIndex: this.pageIndex,
      pageSize: this.pageSize,
    } as PageEvent);
  }

  public getDataPaginated(event: PageEvent) {
    this.service
      .getAllPaginated(event.pageIndex + 1, event.pageSize)
      .subscribe((response) => {
        this.agendamentos$ = response;
      });
    return event;
  }

  onError(errorMessage: string, action: string) {
    this._snackBar.open(errorMessage, action, {
      duration: 3000,
    });
  }

  onAdd() {
    this.router.navigate(['new'], { relativeTo: this.activatedRoute });
  }

  onEdit(id: number) {
    this.router.navigate([id.toString() + '/edit'], {
      relativeTo: this.activatedRoute,
    });
  }
  onDelete(id: number) {}

  openDialog(id: number) {
    this.dialog.open(Dialog, {
      data: {
        delete: this.onDelete(id),
      },
    });
  }
}
