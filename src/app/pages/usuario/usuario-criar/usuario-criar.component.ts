import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { FlexLayoutModule } from '@angular/flex-layout';
import { UsuarioService } from '../../../services/usuario.service';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-usuario-criar',
  standalone: true,
  imports: [
    MatCardModule,
    MatFormFieldModule,
    MatDividerModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatInputModule,
    FlexLayoutModule,
    MatIconModule,
  ],
  templateUrl: './usuario-criar.component.html',
  styleUrl: './usuario-criar.component.css',
})
export class UsuarioCriarComponent {
  form: FormGroup;
  hidePassword = true;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private snackBar: MatSnackBar,
    private usuarioService: UsuarioService
  ) {
    this.form = this.formBuilder.group({
      nome: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      senha: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  onCreate(): void {
    if (this.form.valid) {
      this.usuarioService.create(this.form.value).subscribe({
        next: (response) => {
          this.showMessage('Usuário criado com sucesso!', '', () =>
            this.router.navigate(['/usuarios/entrar'])
          );
        },
        error: (e) => {
          this.showMessage(e.error.message ?? e.error);
        },
      });
    } else {
      this.showMessage('Preencha todos os campos corretamente.');
    }
  }

  onLoginAccount(): void {
    this.router.navigate(['/usuarios/entrar']);
  }

  showMessage(message: string, action?: string, callback?: () => void) {
    const snackBarRef = this.snackBar.open(message, action, {
      duration: 1000,
    });
    snackBarRef.afterDismissed().subscribe(() => {
      if (callback) callback();
    });
  }

  togglePasswordVisibility() {
    this.hidePassword = !this.hidePassword;
  }
}
