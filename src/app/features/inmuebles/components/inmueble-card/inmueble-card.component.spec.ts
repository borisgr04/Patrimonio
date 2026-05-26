import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { provideNoopAnimations } from '@angular/platform-browser/animations';

import { InmuebleCardComponent } from './inmueble-card.component';

describe('InmuebleCardComponent', () => {
  let component: InmuebleCardComponent;
  let fixture: ComponentFixture<InmuebleCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InmuebleCardComponent],
      providers: [provideRouter([]), provideNoopAnimations()],
    }).compileComponents();

    fixture = TestBed.createComponent(InmuebleCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
