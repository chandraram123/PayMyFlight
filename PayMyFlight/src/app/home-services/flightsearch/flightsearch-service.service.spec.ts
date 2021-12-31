import { TestBed } from '@angular/core/testing';

import { FlightsearchServiceService } from './flightsearch-service.service';

describe('FlightsearchServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: FlightsearchServiceService = TestBed.get(FlightsearchServiceService);
    expect(service).toBeTruthy();
  });
});
