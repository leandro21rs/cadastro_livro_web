import { TestBed } from '@angular/core/testing';

import { PesquisaStorageService } from './pesquisa-storage.service';

describe('PesquisaStorageService', () => {
  let service: PesquisaStorageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PesquisaStorageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
