import { Component } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { Observable } from 'rxjs';
import { AsyncPipe } from '@angular/common';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { Dialog } from '../../../components/dialog/dialog.component';
import { AgendamentoService } from '../../../services/agendamento.service';
import { Agendamento } from '../../../models/Agendamento';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-agendamento-list',
  standalone: true,
  imports: [
    MatTableModule,
    AsyncPipe,
    MatSnackBarModule,
    MatButtonModule,
    MatIconModule,
  ],
  templateUrl: './agendamento-list.component.html',
  styleUrl: './agendamento-list.component.css',
})
export class AgendamentoListComponent {
  agendamentos$: Observable<Agendamento[]> | undefined;
  agendamentos_array: Agendamento[] = [];
  displayedColumns = ['nome', 'descricao', 'acao'];

  constructor(
    public _snackBar: MatSnackBar,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    public dialog: MatDialog,
    private service: AgendamentoService,
    private auth: AuthService
  ) {
    auth.login('jose@gmail', '123').subscribe();
    auth.login('jose@gmail', '123').subscribe();
    console.log(auth.getAuthorizationToken());
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
