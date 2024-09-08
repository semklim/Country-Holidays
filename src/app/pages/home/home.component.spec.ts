import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { of, throwError } from 'rxjs';
import { NagerApiService } from 'src/app/services/api/nager-api.service';
import { HomeComponent } from './home.component';

import { Component } from '@angular/core';

@Component({
  selector: 'app-random-countries-widget',
  template: '',
})
class RandomCountriesWidgetStubComponent {}

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let mockNagerApiService: Partial<NagerApiService>;

  beforeEach(async () => {
    mockNagerApiService = {
      getAllCountries: jest
        .fn()
        .mockReturnValue(of([{ name: 'Country A', countryCode: 'CA' }])),
    };

    await TestBed.configureTestingModule({
      declarations: [HomeComponent, RandomCountriesWidgetStubComponent],
      imports: [ReactiveFormsModule],
      providers: [{ provide: NagerApiService, useValue: mockNagerApiService }],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should load countries on initialization', () => {
    expect(component.countries$).toBeTruthy();
    component.countries$.subscribe((countries) => {
      expect(countries).toEqual([{ name: 'Country A', countryCode: 'CA' }]);
    });
  });

  it('should filter countries based on search term', () => {
    component.searchTerm.setValue('Country A');
    fixture.detectChanges();

    component.countries$.subscribe((countries) => {
      expect(countries).toHaveLength(1);
      expect(countries[0].name).toBe('Country A');
    });
  });

  it('should handle error scenario from service', () => {
    mockNagerApiService.getAllCountries = jest
      .fn()
      .mockReturnValue(throwError(() => new Error('Service error')));
    component.ngOnInit(); // Reinitialize to trigger error
    fixture.detectChanges();

    component.countries$.subscribe({
      next: () => {
        throw new Error('Should have failed with service error');
      },
      error: (error) => {
        expect(error).toBeTruthy();
      },
    });
  });
});
