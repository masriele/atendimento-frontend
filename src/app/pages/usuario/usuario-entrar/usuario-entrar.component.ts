import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { FlexLayoutModule } from '@angular/flex-layout';

@Component({
  selector: 'app-usuario-entrar',
  standalone: true,
  imports: [
    MatCardModule,
    MatFormFieldModule,
    MatDividerModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatInputModule,
    FlexLayoutModule,
  ],
  templateUrl: './usuario-entrar.component.html',
  styleUrl: './usuario-entrar.component.css',
})
export class UsuarioEntrarComponent {
  form: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private snackBar: MatSnackBar,
    private authService: AuthService
  ) {
    this.form = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      senha: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  onLogin(): void {
    if (this.form.valid) {
      const email = this.form.value.email;
      const senha = this.form.value.senha;
      this.authService.login(email, senha).subscribe({
        next: (response) => {
          this.showMessage('Login realizado com sucesso!', '', () =>
            this.router.navigate(['/agendamentos'])
          );
        },
        error: (e) => {
          if (e.status == 401) this.showMessage('Credenciais inválidas');
          else this.showMessage(e.error);
        },
      });
    } else {
      this.showMessage('Preencha todos os campos corretamente.');
    }
  }

  onCreateAccount(): void {
    this.router.navigate(['/usuarios/criar']);
  }

  showMessage(message: string, action?: string, callback?: () => void) {
    const snackBarRef = this.snackBar.open(message, action, {
      duration: 750,
    });
    snackBarRef.afterDismissed().subscribe(() => {
      if (callback) callback();
    });
  }
}
