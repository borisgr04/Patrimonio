import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { provideNoopAnimations } from '@angular/platform-browser/animations';

import { ContratoDetailComponent } from './contrato-detail.component';

describe('ContratoDetailComponent', () => {
  let component: ContratoDetailComponent;
  let fixture: ComponentFixture<ContratoDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ContratoDetailComponent],
      providers: [provideRouter([]), provideNoopAnimations()],
    }).compileComponents();

    fixture = TestBed.createComponent(ContratoDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
