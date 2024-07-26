import { Component, ViewChild } from '@angular/core';
import { NavigationEnd, RouterOutlet } from '@angular/router';
import { MatSidenavModule, MatSidenav } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { filter } from 'rxjs';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    MatSidenavModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatListModule,
    CommonModule,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'atendimento-frontend';
  isUserRoute: boolean = false;
  userName: string | null = '';

  @ViewChild(MatSidenav)
  sidenav!: MatSidenav;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
        this.isUserRoute = event.url.includes('/usuarios');
        this.userName = this.isUserRoute
          ? ''
          : localStorage.getItem('authUserName');
      });
  }

  toggleMenu() {
    this.sidenav.toggle();
  }

  navigateTo(route: string) {
    this.toggleMenu();
    this.router.navigate([route], { relativeTo: this.activatedRoute });
  }

  onLogout() {
    this.authService.logout(() => this.navigateTo('usuarios/entrar'));
  }
}
