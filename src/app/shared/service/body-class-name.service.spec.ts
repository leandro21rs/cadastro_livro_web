import { TestBed } from '@angular/core/testing';

import { BodyClassNameService } from './body-class-name.service';

describe('BodyClassNameService', () => {
  let service: BodyClassNameService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BodyClassNameService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
