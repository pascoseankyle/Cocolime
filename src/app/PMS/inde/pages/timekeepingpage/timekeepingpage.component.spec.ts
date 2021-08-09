import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TimekeepingpageComponent } from './timekeepingpage.component';

describe('TimekeepingpageComponent', () => {
  let component: TimekeepingpageComponent;
  let fixture: ComponentFixture<TimekeepingpageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TimekeepingpageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TimekeepingpageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
