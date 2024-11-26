import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableEditExpansionComponent } from './table-edit-expansion.component';

describe('TableEditExpansionComponent', () => {
  let component: TableEditExpansionComponent;
  let fixture: ComponentFixture<TableEditExpansionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TableEditExpansionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TableEditExpansionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
