import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Location } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';
import { ServicoService } from '../../../services/servico.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { FlexLayoutModule } from '@angular/flex-layout';

@Component({
  selector: 'app-servico-form',
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
  templateUrl: './servico-form.component.html',
  styleUrl: './servico-form.component.css'
})
export class ServicoFormComponent {
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
    private servicoService: ServicoService
  ) {
    this.form = this.formBuilder.group({
      nome: ['', Validators.required],
    });

    this.actionType = this.router.url.includes('new') ? 'new' : 'edit';
    this.buttonTitle = this.actionType === 'new' ? 'Cadastrar' : 'Editar';
    this.title = this.actionType === 'new' ? 'Cadastrar Serviço' : 'Editar Serviço';
  }

  ngOnInit(): void {
  }

  onSubmit() {
    if (this.form.valid) {
      if (this.actionType === 'new') {
        this.servicoService.create(this.form.value).subscribe({
          next: () => this.showMessage('Serviço salvo com sucesso!', '', () => this.location.back()),
          error: (e) => this.showMessage(e.error.message ?? e.error),
        });
      } else {
        this.servicoService.update(this.id, this.form.value).subscribe({
          next: () => this.showMessage('Serviço salvo com sucesso!', '', () => this.location.back()),
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
