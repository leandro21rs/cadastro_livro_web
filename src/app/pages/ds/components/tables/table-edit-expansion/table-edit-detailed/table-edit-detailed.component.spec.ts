import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableEditDetailedComponent } from './table-edit-detailed.component';

describe('TableEditDetailedComponent', () => {
  let component: TableEditDetailedComponent;
  let fixture: ComponentFixture<TableEditDetailedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TableEditDetailedComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TableEditDetailedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
