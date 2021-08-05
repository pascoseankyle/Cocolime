import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IndeComponent } from './inde.component';

describe('IndeComponent', () => {
  let component: IndeComponent;
  let fixture: ComponentFixture<IndeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IndeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IndeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
