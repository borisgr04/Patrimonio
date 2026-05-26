import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { provideNoopAnimations } from '@angular/platform-browser/animations';

import { InmuebleDetailComponent } from './inmueble-detail.component';

describe('InmuebleDetailComponent', () => {
  let component: InmuebleDetailComponent;
  let fixture: ComponentFixture<InmuebleDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InmuebleDetailComponent],
      providers: [provideRouter([]), provideNoopAnimations()],
    }).compileComponents();

    fixture = TestBed.createComponent(InmuebleDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
