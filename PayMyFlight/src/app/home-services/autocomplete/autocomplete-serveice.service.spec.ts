import { TestBed } from '@angular/core/testing';

import { AutocompleteServeiceService } from './autocomplete-serveice.service';

describe('AutocompleteServeiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AutocompleteServeiceService = TestBed.get(AutocompleteServeiceService);
    expect(service).toBeTruthy();
  });
});
