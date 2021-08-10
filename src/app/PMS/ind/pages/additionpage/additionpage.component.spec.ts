import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdditionpageComponent } from './additionpage.component';

describe('AdditionpageComponent', () => {
  let component: AdditionpageComponent;
  let fixture: ComponentFixture<AdditionpageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdditionpageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdditionpageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
