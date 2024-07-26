import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsuarioEntrarComponent } from './usuario-entrar.component';

describe('UsuarioEntrarComponent', () => {
  let component: UsuarioEntrarComponent;
  let fixture: ComponentFixture<UsuarioEntrarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UsuarioEntrarComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UsuarioEntrarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
