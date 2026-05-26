import { TestBed } from '@angular/core/testing';

import { InmueblesStore } from './inmuebles.store';

describe('InmueblesStore', () => {
  let service: InmueblesStore;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InmueblesStore);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
