import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TimeinComponent } from './timein.component';

describe('TimeinComponent', () => {
  let component: TimeinComponent;
  let fixture: ComponentFixture<TimeinComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TimeinComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TimeinComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
