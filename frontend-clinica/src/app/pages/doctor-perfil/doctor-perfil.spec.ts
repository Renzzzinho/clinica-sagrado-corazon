import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DoctorPerfil } from './doctor-perfil';

describe('DoctorPerfil', () => {
  let component: DoctorPerfil;
  let fixture: ComponentFixture<DoctorPerfil>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DoctorPerfil],
    }).compileComponents();

    fixture = TestBed.createComponent(DoctorPerfil);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
