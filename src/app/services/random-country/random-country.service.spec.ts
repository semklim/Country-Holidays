import { of } from 'rxjs';
import { NagerApiService } from '../api/nager-api.service';
import { RandomCountryService } from './random-country.service';

describe('RandomCountryService', () => {
  const mockNagerApiService: Partial<NagerApiService> = {
    getAllCountries: jest.fn().mockReturnValue(
      of([
        { countryCode: 'US', name: 'United States' },
        { countryCode: 'DE', name: 'Germany' },
        { countryCode: 'FR', name: 'France' },
        { countryCode: 'UK', name: 'Ukraine' },
      ]),
    ),
    getNextPublicHolidays: jest.fn().mockReturnValue(
      of([
        {
          date: '2024-09-01',
          countryName: 'Country A',
          name: 'Test',
          countryCode: 'US',
        },
        {
          date: '2024-09-01',
          countryName: 'Country A',
          name: 'Test',
          countryCode: 'DE',
        },
        {
          date: '2024-09-01',
          countryName: 'Country A',
          name: 'Test',
          countryCode: 'FR',
        },
      ]),
    ),
  };

  const service = new RandomCountryService(
    mockNagerApiService as NagerApiService,
  );

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch public holidays for three random countries by default', () =>
    new Promise((done) => {
      service.getNextPublicHolidaysForRandomCountries().subscribe((result) => {
        expect(result).toHaveLength(3);
        done('Done');
      });
    }));
  it('should return a list of random countries when a valid count is provided', () =>
    new Promise((done) => {
      service.getNextPublicHolidaysForRandomCountries(2).subscribe((result) => {
        expect(result).toHaveLength(2);
        done('Done');
      });
    }));
});
