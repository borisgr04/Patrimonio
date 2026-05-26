import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { provideNoopAnimations } from '@angular/platform-browser/animations';

import { InmuebleFormComponent } from './inmueble-form.component';

describe('InmuebleFormComponent', () => {
  let component: InmuebleFormComponent;
  let fixture: ComponentFixture<InmuebleFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InmuebleFormComponent],
      providers: [provideRouter([]), provideNoopAnimations()],
    }).compileComponents();

    fixture = TestBed.createComponent(InmuebleFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
