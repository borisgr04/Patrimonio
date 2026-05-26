import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { provideNoopAnimations } from '@angular/platform-browser/animations';

import { PagoFormComponent } from './pago-form.component';

describe('PagoFormComponent', () => {
  let component: PagoFormComponent;
  let fixture: ComponentFixture<PagoFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PagoFormComponent],
      providers: [provideRouter([]), provideNoopAnimations()],
    }).compileComponents();

    fixture = TestBed.createComponent(PagoFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
