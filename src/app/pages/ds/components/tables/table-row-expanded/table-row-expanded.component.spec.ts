import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableRowExpandedComponent } from './table-row-expanded.component';

describe('TableRowExpandedComponent', () => {
  let component: TableRowExpandedComponent;
  let fixture: ComponentFixture<TableRowExpandedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TableRowExpandedComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TableRowExpandedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
