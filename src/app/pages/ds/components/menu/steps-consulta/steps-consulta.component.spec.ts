import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StepsConsultaComponent } from './steps-consulta.component';

describe('StepsConsultaComponent', () => {
  let component: StepsConsultaComponent;
  let fixture: ComponentFixture<StepsConsultaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StepsConsultaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StepsConsultaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
