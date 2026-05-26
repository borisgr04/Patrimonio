import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { provideNoopAnimations } from '@angular/platform-browser/animations';

import { ContratoCardComponent } from './contrato-card.component';

describe('ContratoCardComponent', () => {
  let component: ContratoCardComponent;
  let fixture: ComponentFixture<ContratoCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ContratoCardComponent],
      providers: [provideRouter([]), provideNoopAnimations()],
    }).compileComponents();

    fixture = TestBed.createComponent(ContratoCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
