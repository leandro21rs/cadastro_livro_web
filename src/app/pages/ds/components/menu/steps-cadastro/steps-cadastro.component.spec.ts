import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StepsCadastroComponent } from './steps-cadastro.component';

describe('StepsCadastroComponent', () => {
  let component: StepsCadastroComponent;
  let fixture: ComponentFixture<StepsCadastroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StepsCadastroComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StepsCadastroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
