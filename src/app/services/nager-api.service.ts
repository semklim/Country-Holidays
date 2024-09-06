import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class NagerApiService {
  private apiUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) {}

  getAllCountries(): Observable<AvailableCountries> {
    const url = `${this.apiUrl}/api/v3/AvailableCountries`;
    return this.http.get<AvailableCountries>(url).pipe(catchError(this.handleError));
  }

  getCountryInfo(countryCode: string): Observable<CountryInfo> {
    const url = `${this.apiUrl}/CountryInfo/${countryCode}`;
    return this.http.get<CountryInfo>(url).pipe(catchError(this.handleError));
  }

  getLongWeekends(year: number, countryCode: string): Observable<LongWeekend> {
    const url = `${this.apiUrl}/LongWeekend/${year}/${countryCode}`;
    return this.http.get<LongWeekend>(url).pipe(catchError(this.handleError));
  }

  getPublicHolidays(year: number, countryCode: string): Observable<PublicHolidays> {
    const url = `${this.apiUrl}/PublicHolidays/${year}/${countryCode}`;
    return this.http.get<PublicHolidays>(url).pipe(catchError(this.handleError));
  }

  isTodayPublicHoliday(countryCode: string): Observable<boolean> {
    const url = `${this.apiUrl}/IsTodayPublicHoliday/${countryCode}`;
    return this.http.get(url, { observe: 'response' }).pipe(
      map((response) => {
        if (response.status === 200) {
          return true;
        } else if (response.status === 204) {
          return false;
        } else {
          throw new Error('Unexpected response status: ' + response.status);
        }
      }),
      catchError((error) => this.handleIsTodayPublicHolidayError(error)),
    );
  }

  getNextPublicHolidays(countryCode: string): Observable<NextPublicHolidays> {
    const url = `${this.apiUrl}/NextPublicHolidays/${countryCode}`;
    return this.http.get<NextPublicHolidays>(url).pipe(catchError(this.handleError));
  }

  getNextPublicHolidaysWorldwide(): Observable<NextPublicHolidaysWorldwide> {
    const url = `${this.apiUrl}/NextPublicHolidaysWorldwide`;
    return this.http.get<NextPublicHolidaysWorldwide>(url).pipe(catchError(this.handleError));
  }

  getApiVersion(): Observable<APIVersion> {
    const url = `${this.apiUrl}/Version`;
    return this.http.get<APIVersion>(url).pipe(catchError(this.handleError));
  }

  private handleError(error: HttpErrorResponse): Observable<never> {
    let errorMessage = 'An unknown error occurred!';
    if (error.error instanceof ErrorEvent) {
      errorMessage = `Error: ${error.error.message}`;
    } else {
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.error(errorMessage);
    return throwError(() => new Error(errorMessage));
  }

  // Handle specific errors for isTodayPublicHoliday method
  private handleIsTodayPublicHolidayError(error: HttpErrorResponse): Observable<never> {
    let errorMessage = 'An unknown error occurred!';
    if (error.error instanceof ErrorEvent) {
      errorMessage = `Error: ${error.error.message}`;
    } else {
      switch (error.status) {
        case 400:
          errorMessage = 'Validation failure';
          break;
        case 404:
          errorMessage = 'Country code is unknown';
          break;
        default:
          errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
      }
    }
    console.error(errorMessage);
    return throwError(() => new Error(errorMessage));
  }
}
