import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { provideNoopAnimations } from '@angular/platform-browser/animations';

import { PagoCardComponent } from './pago-card.component';

describe('PagoCardComponent', () => {
  let component: PagoCardComponent;
  let fixture: ComponentFixture<PagoCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PagoCardComponent],
      providers: [provideRouter([]), provideNoopAnimations()],
    }).compileComponents();

    fixture = TestBed.createComponent(PagoCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
