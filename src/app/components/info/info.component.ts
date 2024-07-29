import { Component, Inject } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogTitle,
} from '@angular/material/dialog';
import { DataServicoService } from '../../services/data-servico.service';

@Component({
  selector: 'app-info',
  templateUrl: 'info.component.html',
  standalone: true,
  imports: [MatDialogTitle, MatDialogContent, MatDialogActions, MatDialogClose],
})
export class Info {
  dataServicos$: any;
  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: { id: number },
    private dataServicoService: DataServicoService
  ) {
    this.dataServicoService.getFilter(this.data.id).subscribe((response) => {
      this.dataServicos$ = response;
    });
  }
}
