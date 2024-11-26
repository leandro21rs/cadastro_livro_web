import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StepsConsultaResultadoComponent } from './steps-consulta-resultado.component';

describe('StepsConsultaResultadoComponent', () => {
  let component: StepsConsultaResultadoComponent;
  let fixture: ComponentFixture<StepsConsultaResultadoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StepsConsultaResultadoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StepsConsultaResultadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
