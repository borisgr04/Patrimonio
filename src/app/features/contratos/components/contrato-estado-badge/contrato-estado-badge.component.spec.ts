import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { provideNoopAnimations } from '@angular/platform-browser/animations';

import { ContratoEstadoBadgeComponent } from './contrato-estado-badge.component';

describe('ContratoEstadoBadgeComponent', () => {
  let component: ContratoEstadoBadgeComponent;
  let fixture: ComponentFixture<ContratoEstadoBadgeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ContratoEstadoBadgeComponent],
      providers: [provideRouter([]), provideNoopAnimations()],
    }).compileComponents();

    fixture = TestBed.createComponent(ContratoEstadoBadgeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
