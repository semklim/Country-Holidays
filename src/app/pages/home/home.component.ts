import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import type { Observable } from 'rxjs';
import { of } from 'rxjs';
import {
  debounceTime,
  distinctUntilChanged,
  map,
  startWith,
  switchMap,
} from 'rxjs/operators';
import { NagerApiService } from 'src/app/services/api/nager-api.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  searchTerm = new FormControl('');

  countries$: Observable<AvailableCountries> = of([]);

  constructor(private countryService: NagerApiService) {}

  ngOnInit(): void {
    this.countries$ = this.searchTerm.valueChanges.pipe(
      startWith(''),
      debounceTime(300),
      distinctUntilChanged(),
      switchMap((term) => this.searchCountries(term)),
    );
  }

  searchCountries(searchTerm: string | null): Observable<AvailableCountries> {
    if (!searchTerm || searchTerm.trim().length === 0) {
      return this.countryService.getAllCountries();
    }
    return this.countryService
      .getAllCountries()
      .pipe(
        map((countries) =>
          countries.filter((country) =>
            country.name.toLowerCase().includes(searchTerm.toLowerCase()),
          ),
        ),
      );
  }
}
