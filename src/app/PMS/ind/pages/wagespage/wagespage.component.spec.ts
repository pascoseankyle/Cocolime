import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WagespageComponent } from './wagespage.component';

describe('WagespageComponent', () => {
  let component: WagespageComponent;
  let fixture: ComponentFixture<WagespageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WagespageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WagespageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
