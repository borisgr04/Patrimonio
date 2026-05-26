import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { provideNoopAnimations } from '@angular/platform-browser/animations';

import { ResumenCanonComponent } from './resumen-canon.component';

describe('ResumenCanonComponent', () => {
  let component: ResumenCanonComponent;
  let fixture: ComponentFixture<ResumenCanonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ResumenCanonComponent],
      providers: [provideRouter([]), provideNoopAnimations()],
    }).compileComponents();

    fixture = TestBed.createComponent(ResumenCanonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
