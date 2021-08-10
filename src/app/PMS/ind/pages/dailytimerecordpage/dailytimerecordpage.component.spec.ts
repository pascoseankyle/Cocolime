import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DailytimerecordpageComponent } from './dailytimerecordpage.component';

describe('DailytimerecordpageComponent', () => {
  let component: DailytimerecordpageComponent;
  let fixture: ComponentFixture<DailytimerecordpageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DailytimerecordpageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DailytimerecordpageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
