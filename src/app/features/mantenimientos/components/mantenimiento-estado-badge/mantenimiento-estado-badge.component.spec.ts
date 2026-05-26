import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { provideNoopAnimations } from '@angular/platform-browser/animations';

import { MantenimientoEstadoBadgeComponent } from './mantenimiento-estado-badge.component';

describe('MantenimientoEstadoBadgeComponent', () => {
  let component: MantenimientoEstadoBadgeComponent;
  let fixture: ComponentFixture<MantenimientoEstadoBadgeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MantenimientoEstadoBadgeComponent],
      providers: [provideRouter([]), provideNoopAnimations()],
    }).compileComponents();

    fixture = TestBed.createComponent(MantenimientoEstadoBadgeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
