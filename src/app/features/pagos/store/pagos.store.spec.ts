import { TestBed } from '@angular/core/testing';

import { PagosStore } from './pagos.store';

describe('PagosStore', () => {
  let service: PagosStore;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PagosStore);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
