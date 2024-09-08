import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { environment } from 'src/environments/environment';
import { NagerApiService } from './nager-api.service';

describe('NagerApiService', () => {
  let service: NagerApiService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [NagerApiService],
    });

    service = TestBed.inject(NagerApiService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch all countries from the API and cache the result', () => {
    const mockCountries = [
      { name: 'Country A', countryCode: 'CA' },
      { name: 'Country B', countryCode: 'CB' },
    ];
    const apiUrl = `${environment.apiBaseUrl}/api/v3/AvailableCountries`;

    service.getAllCountries().subscribe((countries) => {
      expect(countries).toEqual(mockCountries);
    });

    const req = httpMock.expectOne(apiUrl);
    expect(req.request.method).toBe('GET');
    req.flush(mockCountries);

    // Call the service again to test caching
    service.getAllCountries().subscribe((countries) => {
      expect(countries).toEqual(mockCountries);
    });

    // No additional request should be made
    httpMock.expectNone(apiUrl);
  });

  it('should handle error correctly', () => {
    const errorResponse = { status: 500, statusText: 'Server Error' };
    const apiUrl = `${environment.apiBaseUrl}/api/v3/AvailableCountries`;

    service.getAllCountries().subscribe({
      next: () => {
        throw new Error('Server-side error');
      },
      error: (error) => {
        expect(error).toBeTruthy();
        expect(error.message).toContain('Server-side error');
      },
    });

    const req = httpMock.expectOne(apiUrl);
    req.flush('Error fetching countries', errorResponse);
  });
});
