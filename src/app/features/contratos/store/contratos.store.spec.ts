import { TestBed } from '@angular/core/testing';

import { ContratosStore } from './contratos.store';

describe('ContratosStore', () => {
  let service: ContratosStore;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ContratosStore);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
