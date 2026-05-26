import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { provideNoopAnimations } from '@angular/platform-browser/animations';

import { RegistroPagoComponent } from './registro-pago.component';

describe('RegistroPagoComponent', () => {
  let component: RegistroPagoComponent;
  let fixture: ComponentFixture<RegistroPagoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegistroPagoComponent],
      providers: [provideRouter([]), provideNoopAnimations()],
    }).compileComponents();

    fixture = TestBed.createComponent(RegistroPagoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
