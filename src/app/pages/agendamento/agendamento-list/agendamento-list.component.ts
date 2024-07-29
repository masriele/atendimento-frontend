import { Component } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { AsyncPipe, DatePipe } from '@angular/common';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { Dialog } from '../../../components/dialog/dialog.component';
import { AgendamentoService } from '../../../services/agendamento.service';
import { Agendamento } from '../../../models/agendamento';
import { MatTooltipModule } from '@angular/material/tooltip';

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
    DatePipe,
    MatTooltipModule,
  ],
  providers: [DatePipe],
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
    'data',
    'dia',
    'horario',
    'acao',
  ];

  pageIndex = 0;
  pageSize = 10;

  constructor(
    public snackBar: MatSnackBar,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    public dialog: MatDialog,
    private service: AgendamentoService,
    private datePipe: DatePipe
  ) {
    this.getDataPaginated({
      pageIndex: this.pageIndex,
      pageSize: this.pageSize,
    } as PageEvent);
    this.service
      .getAll()
      .subscribe((response) => (this.agendamentos_array = response));
  }

  public getDataPaginated(event: PageEvent) {
    this.service
      .getAllPaginated(event.pageIndex + 1, event.pageSize)
      .subscribe((response) => {
        this.agendamentos$ = response;
      });
    return event;
  }

  onAdd() {
    this.router.navigate(['new'], { relativeTo: this.activatedRoute });
  }

  onEdit(id: number) {
    this.router.navigate([id.toString() + '/edit'], {
      relativeTo: this.activatedRoute,
    });
  }
  onDelete(id: number) {
    this.service.delete(id).subscribe({
      complete: () =>
        this.showMessage('Agendamento deletado com sucesso!', '', () =>
          window.location.reload()
        ),
    });
  }

  showMessage(message: string, action?: string, callback?: () => void) {
    const snackBarRef = this.snackBar.open(message, action, {
      duration: 750,
    });
    snackBarRef.afterDismissed().subscribe(() => {
      if (callback) callback();
    });
  }

  openDialog(id: number) {
    this.dialog.open(Dialog, {
      data: {
        id: id,
        delete: (id: number) => this.onDelete(id),
      },
    });
  }
}
