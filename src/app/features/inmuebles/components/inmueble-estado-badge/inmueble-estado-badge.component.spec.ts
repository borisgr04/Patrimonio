import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { provideNoopAnimations } from '@angular/platform-browser/animations';

import { InmuebleEstadoBadgeComponent } from './inmueble-estado-badge.component';

describe('InmuebleEstadoBadgeComponent', () => {
  let component: InmuebleEstadoBadgeComponent;
  let fixture: ComponentFixture<InmuebleEstadoBadgeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InmuebleEstadoBadgeComponent],
      providers: [provideRouter([]), provideNoopAnimations()],
    }).compileComponents();

    fixture = TestBed.createComponent(InmuebleEstadoBadgeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
