import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { provideNoopAnimations } from '@angular/platform-browser/animations';

import { AlertasPagoComponent } from './alertas-pago.component';

describe('AlertasPagoComponent', () => {
  let component: AlertasPagoComponent;
  let fixture: ComponentFixture<AlertasPagoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AlertasPagoComponent],
      providers: [provideRouter([]), provideNoopAnimations()],
    }).compileComponents();

    fixture = TestBed.createComponent(AlertasPagoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
