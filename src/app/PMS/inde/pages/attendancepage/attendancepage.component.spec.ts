import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AttendancepageComponent } from './attendancepage.component';

describe('AttendancepageComponent', () => {
  let component: AttendancepageComponent;
  let fixture: ComponentFixture<AttendancepageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AttendancepageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AttendancepageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
