import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { provideNoopAnimations } from '@angular/platform-browser/animations';

import { ContratosListComponent } from './contratos-list.component';

describe('ContratosListComponent', () => {
  let component: ContratosListComponent;
  let fixture: ComponentFixture<ContratosListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ContratosListComponent],
      providers: [provideRouter([]), provideNoopAnimations()],
    }).compileComponents();

    fixture = TestBed.createComponent(ContratosListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
