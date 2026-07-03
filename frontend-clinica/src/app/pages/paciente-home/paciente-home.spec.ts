import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PacienteHome } from './paciente-home';

describe('PacienteHome', () => {
  let component: PacienteHome;
  let fixture: ComponentFixture<PacienteHome>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PacienteHome],
    }).compileComponents();

    fixture = TestBed.createComponent(PacienteHome);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
