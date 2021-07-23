import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardpanelComponent } from './cardpanel.component';

describe('CardpanelComponent', () => {
  let component: CardpanelComponent;
  let fixture: ComponentFixture<CardpanelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CardpanelComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CardpanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
