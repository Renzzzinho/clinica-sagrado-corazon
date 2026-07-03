import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DoctorCitas } from './doctor-citas';

describe('DoctorCitas', () => {
  let component: DoctorCitas;
  let fixture: ComponentFixture<DoctorCitas>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DoctorCitas],
    }).compileComponents();

    fixture = TestBed.createComponent(DoctorCitas);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
