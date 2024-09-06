import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import type { Observable } from 'rxjs';
import { of } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { NagerApiService } from 'src/app/services/nager-api.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  searchTerm = new FormControl('');

  countries: AvailableCountries = [];

  allCountries: AvailableCountries = [];

  constructor(private countryService: NagerApiService) {}

  ngOnInit(): void {
    this.loadCountries();

    this.searchTerm.valueChanges
      .pipe(
        debounceTime(300),
        distinctUntilChanged(),
        switchMap((term) => this.searchCountries(term)),
      )
      .subscribe();
  }

  loadCountries(): void {
    this.countryService.getAllCountries().subscribe({
      next: (data) => {
        this.allCountries = data; // Store all countries for client-side filtering
        this.countries = data; // Initialize the countries list
      },
      error: (err) => {
        console.error('Failed to load countries:', err);
      },
    });
  }

  searchCountries(searchTerm: string | null): Observable<AvailableCountries> {
    if (!searchTerm || searchTerm.length === 0) {
      this.countries = this.allCountries; // Reset to all countries
      return of(this.countries);
    }
    this.countries = this.allCountries.filter((country) =>
      country.name.toLowerCase().includes(searchTerm.toLowerCase()),
    );

    return of(this.countries);
  }
}
