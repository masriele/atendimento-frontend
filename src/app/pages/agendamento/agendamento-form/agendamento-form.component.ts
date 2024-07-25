import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
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
import { DataServicoService } from '../../../services/data-servico.service';
import { MatCardModule } from '@angular/material/card';
import { concatMap } from 'rxjs/operators';
import { FlexLayoutModule } from '@angular/flex-layout';

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
  ],
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
  dataServicos: DataServico[] = [];
  loading = true;

  constructor(
    private formBuilder: FormBuilder,
    private service: AgendamentoService,
    private snackBar: MatSnackBar,
    private location: Location,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private servicePaciente: PacienteService,
    private serviceAtendente: AtendenteService,
    private serviceDataServico: DataServicoService
  ) {
    this.form = this.formBuilder.group({
      pacienteId: [''],
      atendenteId: [''],
      dataServicoId: [''],
    });

    this.actionType = this.router.url.includes('new') ? 'new' : 'edit';
    this.buttonTitle = this.actionType === 'new' ? 'Cadastrar' : 'Editar';
    this.title =
      this.actionType === 'new'
        ? 'Cadastrar Agendamento'
        : 'Editar Agendamento';
  }

  ngOnInit(): void {
    this.loadSelectsData();
    if (this.actionType === 'edit') {
      const param_id = this.activatedRoute.snapshot.paramMap.get('id');
      this.id = param_id != null ? parseInt(param_id) : 0;

      this.service.getById(this.id).subscribe((response) => {
        this.form.patchValue({
          pacienteId: response.paciente.id,
          atendenteId: response.atendente.id,
          dataServicoId: response.dataServico.id,
        });
      });
    }
  }

  loadSelectsData(): void {
    this.servicePaciente
      .getAll()
      .pipe(
        concatMap((pacientes) => {
          this.pacientes = pacientes;
          return this.serviceAtendente.getAll();
        }),
        concatMap((atendentes) => {
          this.atendentes = atendentes;
          return this.serviceDataServico.getAll();
        })
      )
      .subscribe((dataServicos) => {
        this.dataServicos = dataServicos;
        this.loading = false;
      });
  }

  onSubmit() {
    if (this.actionType === 'new') {
      this.service.create(this.form.value).subscribe({
        next: (v) => this.onSucess(),
        error: (e) => this.snackBar.open(e, '', { duration: 1000 }),
      });
    } else {
      this.service.update(this.id, this.form.value).subscribe({
        next: (v) => this.onSucess(),
        error: (e) => this.snackBar.open(e, '', { duration: 1000 }),
      });
    }
  }

  onSucess() {
    this.snackBar.open('Salvo!', '', { duration: 1000 });
    this.location.back();
  }

  onCancel() {
    this.location.back();
  }
}
