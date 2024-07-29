import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Location } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';
import { ServicoService } from '../../../services/servico.service';
import { DataSemanaService } from '../../../services/data-semana.service';
import { Servico } from '../../../models/servico';
import { DataSemana } from '../../../models/dataSemana';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatSelectModule } from '@angular/material/select';
import { DataServicoService } from '../../../services/data-servico.service';

@Component({
  selector: 'app-data-semana-form',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatCardModule,
    MatButtonModule,
    MatDividerModule,
    FlexLayoutModule,
    MatSelectModule,
    MatTableModule,
  ],
  templateUrl: './data-semana-form.component.html',
  styleUrls: ['./data-semana-form.component.css'],
})
export class DataSemanaFormComponent implements OnInit {
  form: FormGroup;
  id: number = 0;
  servicos: Servico[] = [];
  loading = true;

  constructor(
    private formBuilder: FormBuilder,
    private snackBar: MatSnackBar,
    private location: Location,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private servicoService: ServicoService,
    private dataSemanaService: DataSemanaService,
    private dataServicoService: DataServicoService
  ) {
    this.form = this.formBuilder.group({
      servicoId: ['', Validators.required],
      dia: ['', Validators.required],
      horario: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.loadServicos();
    const param_id = this.activatedRoute.snapshot.paramMap.get('id');
    this.id = param_id != null ? parseInt(param_id) : 0;
    this.dataServicoService.getFilter(this.id).subscribe((response) => {
      this.form.patchValue({
        servicoId: response[0].servico.id,
        dia: '',
        horario: '',
      });
      this.loading = false;
    });
  }

  loadServicos() {
    this.servicoService.getAll().subscribe((servicos) => {
      this.servicos = servicos;
    });
  }

  onSubmit() {
    if (this.form.valid) {
      const formValue = this.form.value;
      const servicoId = formValue.servicoId;

      const dataSemana: DataSemana = {
        dia: formValue.dia,
        horario: formValue.horario,
        id: 0,
        dataServicos: [],
      };
      this.dataSemanaService.create(dataSemana, servicoId).subscribe({
        next: () =>
          this.showMessage('Dia e horário salvos com sucesso!', '', () =>
            this.location.back()
          ),
        error: (e) => this.showMessage(e.error.message ?? e.error),
      });
    } else {
      this.showMessage('Preencha todos os campos corretamente.');
    }
  }

  showMessage(message: string, action?: string, callback?: () => void) {
    const snackBarRef = this.snackBar.open(message, action, {
      duration: 1000,
    });
    snackBarRef.afterDismissed().subscribe(() => {
      if (callback) callback();
    });
  }

  onCancel() {
    this.location.back();
  }
}
