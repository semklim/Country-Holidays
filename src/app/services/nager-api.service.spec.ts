import { TestBed } from '@angular/core/testing';

import { NagerApiService } from './nager-api.service';

describe('NagerApiService', () => {
  let service: NagerApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NagerApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
