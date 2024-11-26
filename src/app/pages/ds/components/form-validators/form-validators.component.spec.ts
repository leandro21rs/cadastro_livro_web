import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormValidatorsComponent } from './form-validators.component';

describe('FormValidatorsComponent', () => {
  let component: FormValidatorsComponent;
  let fixture: ComponentFixture<FormValidatorsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormValidatorsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormValidatorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
