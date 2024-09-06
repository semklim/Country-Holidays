import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RandomCountriesWidgetComponent } from './random-countries.component';

describe('RandomCountriesWidgetComponent', () => {
  let component: RandomCountriesWidgetComponent;
  let fixture: ComponentFixture<RandomCountriesWidgetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RandomCountriesWidgetComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(RandomCountriesWidgetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
