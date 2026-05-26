import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { provideNoopAnimations } from '@angular/platform-browser/animations';

import { PagoEstadoBadgeComponent } from './pago-estado-badge.component';

describe('PagoEstadoBadgeComponent', () => {
  let component: PagoEstadoBadgeComponent;
  let fixture: ComponentFixture<PagoEstadoBadgeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PagoEstadoBadgeComponent],
      providers: [provideRouter([]), provideNoopAnimations()],
    }).compileComponents();

    fixture = TestBed.createComponent(PagoEstadoBadgeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
