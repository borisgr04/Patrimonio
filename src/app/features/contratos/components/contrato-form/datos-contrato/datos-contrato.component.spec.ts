import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { provideNoopAnimations } from '@angular/platform-browser/animations';

import { DatosContratoComponent } from './datos-contrato.component';

describe('DatosContratoComponent', () => {
  let component: DatosContratoComponent;
  let fixture: ComponentFixture<DatosContratoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DatosContratoComponent],
      providers: [provideRouter([]), provideNoopAnimations()],
    }).compileComponents();

    fixture = TestBed.createComponent(DatosContratoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
