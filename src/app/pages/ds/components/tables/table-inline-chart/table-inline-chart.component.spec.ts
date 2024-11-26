import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableInlineChartComponent } from './table-inline-chart.component';

describe('TableInlineChartComponent', () => {
  let component: TableInlineChartComponent;
  let fixture: ComponentFixture<TableInlineChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TableInlineChartComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TableInlineChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
