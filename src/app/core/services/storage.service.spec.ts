import { TestBed } from '@angular/core/testing';

import { StorageService, STORAGE_KEYS } from './storage.service';

describe('StorageService', () => {
  let service: StorageService;

  beforeEach(() => {
    localStorage.clear();
    TestBed.configureTestingModule({});
    service = TestBed.inject(StorageService);
  });

  it('should save and retrieve entities', () => {
    const save = service.save(STORAGE_KEYS.inmuebles, { id: '1', alias: 'A' });
    const get = service.getById<{ id: string; alias: string }>(STORAGE_KEYS.inmuebles, '1');

    expect(save.success).toBe(true);
    expect(get.success).toBe(true);
    if (get.success) {
      expect(get.data?.alias).toBe('A');
    }
  });

  it('should update and delete entities', () => {
    service.save(STORAGE_KEYS.inmuebles, { id: '1', alias: 'A' });
    const updated = service.update<{ id: string; alias: string }>(STORAGE_KEYS.inmuebles, '1', {
      alias: 'B',
    });
    const deleted = service.delete<{ id: string; alias: string }>(STORAGE_KEYS.inmuebles, '1');

    expect(updated.success).toBe(true);
    expect(deleted.success).toBe(true);
    if (deleted.success) {
      expect(deleted.data.length).toBe(0);
    }
  });
});
