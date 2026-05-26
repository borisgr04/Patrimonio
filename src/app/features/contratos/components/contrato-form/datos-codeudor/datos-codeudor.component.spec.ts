import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { provideNoopAnimations } from '@angular/platform-browser/animations';

import { DatosCodeudorComponent } from './datos-codeudor.component';

describe('DatosCodeudorComponent', () => {
  let component: DatosCodeudorComponent;
  let fixture: ComponentFixture<DatosCodeudorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DatosCodeudorComponent],
      providers: [provideRouter([]), provideNoopAnimations()],
    }).compileComponents();

    fixture = TestBed.createComponent(DatosCodeudorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
