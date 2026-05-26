import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { provideNoopAnimations } from '@angular/platform-browser/animations';

import { EstadoInmueblesComponent } from './estado-inmuebles.component';

describe('EstadoInmueblesComponent', () => {
  let component: EstadoInmueblesComponent;
  let fixture: ComponentFixture<EstadoInmueblesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EstadoInmueblesComponent],
      providers: [provideRouter([]), provideNoopAnimations()],
    }).compileComponents();

    fixture = TestBed.createComponent(EstadoInmueblesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
