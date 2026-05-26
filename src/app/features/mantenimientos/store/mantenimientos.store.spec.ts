import { TestBed } from '@angular/core/testing';

import { MantenimientosStore } from './mantenimientos.store';

describe('MantenimientosStore', () => {
  let service: MantenimientosStore;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MantenimientosStore);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
