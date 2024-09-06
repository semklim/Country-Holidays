import { Injectable } from '@angular/core';
import { catchError, forkJoin, map, switchMap } from 'rxjs';
import { NagerApiService } from '../api/nager-api.service';
import { HandleErrorService } from '../handleError/handle-error.service';

interface NextHolidayInCountry extends Holiday {
  countryName: string;
}

@Injectable({
  providedIn: 'root',
})
export class RandomCountryService extends HandleErrorService {
  constructor(private countryService: NagerApiService) {
    super();
  }

  /**
   *  This method fetches the next public holidays for three random countries using forkJoin to make parallel HTTP requests.
   * @param count number
   * @returns Observable<any[]>
   */
  public getNextPublicHolidaysForRandomCountries(count = 3) {
    // Get the random countries as an observable and use switchMap to chain further operations.
    return this.getRandomCountries(count).pipe(
      switchMap((randomCountries) => {
        const requests = randomCountries.map(({ countryCode, name }) =>
          this.countryService.getNextPublicHolidays(countryCode).pipe(
            map((holidays) =>
              holidays.map<NextHolidayInCountry>((el) => {
                return {
                  ...el,
                  countryName: name,
                };
              }),
            ),
          ),
        );

        // Run multiple requests in parallel using forkJoin
        return forkJoin(requests);
      }),
      catchError(this.handleError),
    );
  }

  private getRandomCountries(count: number) {
    return this.countryService.getAllCountries().pipe(map((country) => this.shuffleArray(country).slice(0, count)));
  }

  /** Shuffles an array to randomize the country codes. */
  private shuffleArray(array: AvailableCountries) {
    return array.sort(() => Math.random() - 0.5);
  }
}
