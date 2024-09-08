import { Component, OnInit } from '@angular/core';
import { RandomCountryService } from 'src/app/services/random-country/random-country.service';

@Component({
  selector: 'app-random-countries-widget',
  templateUrl: './random-countries.component.html',
  styleUrls: ['./random-countries.component.css'],
})
export class RandomCountriesWidgetComponent implements OnInit {
  randomCountriesWithHolidays: {
    country: string;
    holidayName: string;
    holidayDate: string;
    countryCode: string;
  }[] = [];

  loading = true;

  error: string | null = null;

  constructor(private randomCountryService: RandomCountryService) {}

  ngOnInit(): void {
    this.fetchRandomCountriesWithHolidays();
  }

  fetchRandomCountriesWithHolidays(): void {
    this.randomCountryService
      .getNextPublicHolidaysForRandomCountries()
      .subscribe({
        next: (responses) => {
          this.randomCountriesWithHolidays = responses.map((country) => {
            if (country.length > 0) {
              const { countryCode, countryName, name, date } = country[0];
              return {
                countryCode: countryCode,
                country: countryName,
                holidayName: name,
                holidayDate: date,
              };
            }
            return {
              countryCode: '',
              country: 'Unknown',
              holidayName: 'No upcoming holidays',
              holidayDate: '-',
            };
          });

          this.loading = false;
        },
        error: (err) => {
          this.error = 'Error fetching holidays for random countries';
          this.loading = false;
          console.error(err);
        },
      });
  }
}
