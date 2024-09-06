import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { NagerApiService } from 'src/app/services/api/nager-api.service';

@Component({
  selector: 'app-country',
  templateUrl: './country.component.html',
  styleUrls: ['./country.component.css'],
})
export class CountryComponent implements OnInit, OnDestroy {
  private routeSubscription?: Subscription;

  years = [2020, 2021, 2022, 2023, 2024, 2025, 2026, 2027, 2028, 2029, 2030];

  countries: AvailableCountries = [];

  country?: Country;

  countryCode = '';

  holidays: PublicHolidays = [];

  currentYear: number = new Date().getFullYear();

  error: string | null = null;

  loading = true;

  constructor(private route: ActivatedRoute, private countryService: NagerApiService) {}

  ngOnInit(): void {
    // Load countries to validate the code later
    this.countryService.getAllCountries().subscribe({
      next: (countries) => {
        this.countries = countries;
        this.subscribeToRouteParams();
      },
      error: (err) => {
        this.error = 'Failed to fetch country list. Please try again later.';
        console.error(err);
        this.loading = false;
      },
    });
  }

  subscribeToRouteParams(): void {
    this.routeSubscription = this.route.queryParamMap.subscribe((params) => {
      this.countryCode = params.get('code') || '';
      this.country = this.validateCode(this.countryCode);

      if (this.country) {
        this.fetchHolidays(this.currentYear);
      } else {
        this.error = 'Invalid country code. Please provide a valid code.';
        this.loading = false;
      }
    });
  }

  ngOnDestroy(): void {
    this.routeSubscription?.unsubscribe();
  }

  fetchHolidays(year: number): void {
    this.loading = true;
    this.countryService.getPublicHolidays(year, this.countryCode).subscribe({
      next: (holidays) => {
        this.holidays = holidays;
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Failed to fetch holidays. Please try again later.';
        console.error(err);
        this.loading = false;
      },
    });
  }

  onYearChange(year: number): void {
    this.currentYear = year;
    this.fetchHolidays(year);
  }

  validateCode(code: string) {
    return this.countries.find((country) => country.countryCode === code);
  }

  getLocateDate(date: string) {
    return new Intl.DateTimeFormat('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: '2-digit',
      day: 'numeric',
    }).format(new Date(date));
  }
}
