import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CRMmainComponent } from './main.component';

describe('CRMmainComponent', () => {
  let component: CRMmainComponent;
  let fixture: ComponentFixture<CRMmainComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CRMmainComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CRMmainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
