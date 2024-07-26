import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDividerModule } from '@angular/material/divider';
import { Location } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { AgendamentoService } from '../../../services/agendamento.service';
import { Paciente } from '../../../models/paciente';
import { Atendente } from '../../../models/atendente';
import { DataServico } from '../../../models/dataServico';
import { PacienteService } from '../../../services/paciente.service';
import { AtendenteService } from '../../../services/atendente.service';
import { MatCardModule } from '@angular/material/card';
import { concatMap, map, tap } from 'rxjs/operators';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { ServicoService } from '../../../services/servico.service';
import { Servico } from '../../../models/servico';
import { Observable, of } from 'rxjs';
import { provideMomentDateAdapter } from '@angular/material-moment-adapter';

export const MY_DATE_FORMATS = {
  parse: {
    dateInput: 'DD/MM/YYYY',
  },
  display: {
    dateInput: 'DD/MM/YYYY',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'DD/MM/YYYY',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};
@Component({
  selector: 'app-agendamento-form',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatCardModule,
    MatDividerModule,
    MatButtonModule,
    FlexLayoutModule,
    MatDatepickerModule,
  ],
  providers: [provideMomentDateAdapter(MY_DATE_FORMATS)],
  templateUrl: './agendamento-form.component.html',
  styleUrl: './agendamento-form.component.css',
})
export class AgendamentoFormComponent {
  form: FormGroup;
  actionType: string;
  id: number = 0;
  title: string;
  buttonTitle: string;
  pacientes: Paciente[] = [];
  atendentes: Atendente[] = [];
  servicos: Servico[] = [];
  dataServicos: DataServico[] = [];
  loading = true;
  selectedDateTime: string = '';
  isDisabled = true;

  constructor(
    private formBuilder: FormBuilder,
    private service: AgendamentoService,
    private snackBar: MatSnackBar,
    private location: Location,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private servicePaciente: PacienteService,
    private serviceAtendente: AtendenteService,
    private serviceServico: ServicoService
  ) {
    this.form = this.formBuilder.group({
      pacienteId: ['', Validators.required],
      atendenteId: ['', Validators.required],
      dataServicoId: [{ value: '', disabled: true }, Validators.required],
      data: [null, Validators.required],
      servico: ['', Validators.required],
    });

    this.actionType = this.router.url.includes('new') ? 'new' : 'edit';
    this.buttonTitle = this.actionType === 'new' ? 'Cadastrar' : 'Editar';
    this.title =
      this.actionType === 'new'
        ? 'Cadastrar Agendamento'
        : 'Editar Agendamento';
  }

  ngOnInit(): void {
    this.loadSelectsData()
      .pipe(
        concatMap(() => {
          if (this.actionType === 'edit') {
            const param_id = this.activatedRoute.snapshot.paramMap.get('id');
            this.id = param_id != null ? parseInt(param_id) : 0;
            return this.service.getById(this.id);
          } else {
            return of(null);
          }
        })
      )
      .subscribe((response) => {
        if (response) {
          this.updateDataServicos(response.dataServico.servicoId);
          this.form.patchValue({
            pacienteId: response.paciente.id,
            atendenteId: response.atendente.id,
            servico: response.dataServico.servicoId,
            dataServicoId: response.dataServico.id,
            data: response.data,
          });
        }
      });
  }

  loadSelectsData(): Observable<void> {
    return this.servicePaciente.getAll().pipe(
      concatMap((pacientes) => {
        this.pacientes = pacientes;
        return this.serviceAtendente.getAll();
      }),
      concatMap((atendentes) => {
        this.atendentes = atendentes;
        return this.serviceServico.getAll();
      }),
      tap((servicos) => {
        this.servicos = servicos;
        this.loading = false;
      }),
      map(() => {})
    );
  }

  onSubmit() {
    if (this.form.valid) {
      if (this.actionType === 'new') {
        this.service.create(this.form.value).subscribe({
          next: (v) =>
            this.showMessage('Agendamento salvo com sucesso!', '', () =>
              this.location.back()
            ),
          error: (e) => {
            this.showMessage(e.error.message ?? e.error);
          },
        });
      } else {
        this.service.update(this.id, this.form.value).subscribe({
          next: (v) =>
            this.showMessage('Agendamento salvo com sucesso!', '', () =>
              this.location.back()
            ),
          error: (e) => {
            this.showMessage(e.error.message ?? e.error);
          },
        });
      }
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

  onServiceChange(servicoId: number): void {
    this.updateDataServicos(servicoId);
  }

  updateDataServicos(servicoId: number): void {
    const selectedServico = this.servicos.find(
      (servico) => servico.id === servicoId
    );

    if (selectedServico) this.dataServicos = selectedServico.dataServicos;

    if (this.dataServicos.length > 0) this.form.get('dataServicoId')?.enable();
    else this.form.get('dataServicoId')?.disable();
  }
}
