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
import { Paciente } from '../../../models/paciente';
import { PacienteService } from '../../../services/paciente.service';

@Component({
  selector: 'app-paciente-list',
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
  ],
  providers: [DatePipe],
  templateUrl: './paciente-list.component.html',
  styleUrl: './paciente-list.component.css',
})
export class PacienteListComponent {
  pacientes$: any;
  pacientes_array: Paciente[] = [];
  displayedColumns = [
    'nome',
    'telefone',
    'acao',
  ];

  pageIndex = 0;
  pageSize = 10;

  constructor(
    public snackBar: MatSnackBar,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    public dialog: MatDialog,
    private service: PacienteService,
    private datePipe: DatePipe
  ) {
    this.getDataPaginated({
      pageIndex: this.pageIndex,
      pageSize: this.pageSize,
    } as PageEvent);
  }

  public getDataPaginated(event: PageEvent) {
    this.service
      .getAllPaginated(event.pageIndex + 1, event.pageSize)
      .subscribe((response) => {
        this.pacientes$ = response;
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
        this.showMessage('Paciente deletado com sucesso!', '', () =>
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
        agendId: id,
        delete: (agendId: number) => this.onDelete(agendId),
      },
    });
  }
}
