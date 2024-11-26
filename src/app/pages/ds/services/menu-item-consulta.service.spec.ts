import { TestBed } from '@angular/core/testing';

import { MenuItemConsultaService } from './menu-item-consulta.service';

describe('MenuItemConsultaService', () => {
  let service: MenuItemConsultaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MenuItemConsultaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
