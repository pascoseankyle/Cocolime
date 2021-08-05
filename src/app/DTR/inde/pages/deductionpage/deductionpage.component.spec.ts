import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeductionpageComponent } from './deductionpage.component';

describe('DeductionpageComponent', () => {
  let component: DeductionpageComponent;
  let fixture: ComponentFixture<DeductionpageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeductionpageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeductionpageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
