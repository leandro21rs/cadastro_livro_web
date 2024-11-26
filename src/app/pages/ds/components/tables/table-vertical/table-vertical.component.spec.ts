import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableVerticalComponent } from './table-vertical.component';

describe('TableVerticalComponent', () => {
  let component: TableVerticalComponent;
  let fixture: ComponentFixture<TableVerticalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TableVerticalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TableVerticalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
