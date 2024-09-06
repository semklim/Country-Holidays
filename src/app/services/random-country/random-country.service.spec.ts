import { TestBed } from '@angular/core/testing';

import { RandomCountryService } from './random-country.service';

describe('RandomCountryService', () => {
  let service: RandomCountryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RandomCountryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
