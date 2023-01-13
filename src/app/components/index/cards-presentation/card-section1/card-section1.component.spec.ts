import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardSection1Component } from './card-section1.component';

describe('CardSection1Component', () => {
  let component: CardSection1Component;
  let fixture: ComponentFixture<CardSection1Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CardSection1Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CardSection1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
