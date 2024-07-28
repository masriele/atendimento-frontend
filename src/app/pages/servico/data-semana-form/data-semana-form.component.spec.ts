import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DataSemanaFormComponent } from './data-semana-form.component';

describe('DataSemanaFormComponent', () => {
  let component: DataSemanaFormComponent;
  let fixture: ComponentFixture<DataSemanaFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DataSemanaFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DataSemanaFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
