import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { provideNoopAnimations } from '@angular/platform-browser/animations';

import { InmueblesListComponent } from './inmuebles-list.component';

describe('InmueblesListComponent', () => {
  let component: InmueblesListComponent;
  let fixture: ComponentFixture<InmueblesListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InmueblesListComponent],
      providers: [provideRouter([]), provideNoopAnimations()],
    }).compileComponents();

    fixture = TestBed.createComponent(InmueblesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
