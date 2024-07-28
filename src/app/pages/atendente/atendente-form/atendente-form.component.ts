import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Location } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';
import { AtendenteService } from '../../../services/atendente.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { FlexLayoutModule } from '@angular/flex-layout';

@Component({
  selector: 'app-atendente-form',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatCardModule,
    MatButtonModule,
    MatDividerModule,
    FlexLayoutModule,
    ReactiveFormsModule,
  ],
  templateUrl: './atendente-form.component.html',
  styleUrl: './atendente-form.component.css',
})
export class AtendenteFormComponent implements OnInit {
  form: FormGroup;
  actionType: string;
  id: number = 0;
  title: string;
  buttonTitle: string;
  loading = true;

  constructor(
    private formBuilder: FormBuilder,
    private snackBar: MatSnackBar,
    private location: Location,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private atendenteService: AtendenteService
  ) {
    this.form = this.formBuilder.group({
      nome: ['', Validators.required],
      telefone: ['', Validators.required],
    });

    this.actionType = this.router.url.includes('new') ? 'new' : 'edit';
    this.buttonTitle = this.actionType === 'new' ? 'Cadastrar' : 'Editar';
    this.title = this.actionType === 'new' ? 'Cadastrar Atendente' : 'Editar Atendente';
  }

  ngOnInit(): void {
    if (this.actionType === 'edit') {
      const param_id = this.activatedRoute.snapshot.paramMap.get('id');
      this.id = param_id != null ? parseInt(param_id) : 0;
      this.atendenteService.getById(this.id).subscribe((response) => {
        this.form.patchValue({
          nome: response.nome,
          telefone: response.telefone,
        });
        this.loading = false;
      });
    } else {
      this.loading = false;
    }
  }

  onSubmit() {
    if (this.form.valid) {
      if (this.actionType === 'new') {
        this.atendenteService.create(this.form.value).subscribe({
          next: () => this.showMessage('Atendente salvo com sucesso!', '', () => this.location.back()),
          error: (e) => this.showMessage(e.error.message ?? e.error),
        });
      } else {
        this.atendenteService.update(this.id, this.form.value).subscribe({
          next: () => this.showMessage('Atendente salvo com sucesso!', '', () => this.location.back()),
          error: (e) => this.showMessage(e.error.message ?? e.error),
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
}
