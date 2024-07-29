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
import { AtendenteService } from '../../../services/atendente.service';
import { Atendente } from '../../../models/atendente';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-atendente-list',
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
    MatProgressSpinnerModule,
  ],
  providers: [DatePipe],
  templateUrl: './atendente-list.component.html',
  styleUrl: './atendente-list.component.css',
})
export class AtendenteListComponent {
  atendentes$: any;
  atendentes_array: Atendente[] = [];
  displayedColumns = ['nome', 'telefone', 'acao'];

  pageIndex = 0;
  pageSize = 10;

  constructor(
    public snackBar: MatSnackBar,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    public dialog: MatDialog,
    private service: AtendenteService,
    private datePipe: DatePipe
  ) {
    this.getDataPaginated({
      pageIndex: this.pageIndex,
      pageSize: this.pageSize,
    } as PageEvent);
    this.service
      .getAll()
      .subscribe((response) => (this.atendentes_array = response));
  }

  public getDataPaginated(event: PageEvent) {
    this.service
      .getAllPaginated(event.pageIndex + 1, event.pageSize)
      .subscribe((response) => {
        this.atendentes$ = response;
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
        this.showMessage('Atendente deletado com sucesso!', '', () =>
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
