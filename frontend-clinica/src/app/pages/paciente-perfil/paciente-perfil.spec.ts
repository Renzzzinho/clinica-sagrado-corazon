import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PacientePerfil } from './paciente-perfil';

describe('PacientePerfil', () => {
  let component: PacientePerfil;
  let fixture: ComponentFixture<PacientePerfil>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PacientePerfil],
    }).compileComponents();

    fixture = TestBed.createComponent(PacientePerfil);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
