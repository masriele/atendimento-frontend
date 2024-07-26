import { Component, Inject } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogTitle,
} from '@angular/material/dialog';
import { MatButton } from '@angular/material/button';

@Component({
  selector: 'app-dialog',
  templateUrl: 'dialog.component.html',
  standalone: true,
  imports: [
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose,
    MatButton,
  ],
})
export class Dialog {
  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: { agendId: number; delete: (agendId: number) => void }
  ) {}

  onDelete() {
    this.data.delete(this.data.agendId);
  }
}
