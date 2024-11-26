import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AtividadesPendentesComponent } from './atividades-pendentes.component';

describe('AtividadesPendentesComponent', () => {
  let component: AtividadesPendentesComponent;
  let fixture: ComponentFixture<AtividadesPendentesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AtividadesPendentesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AtividadesPendentesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
