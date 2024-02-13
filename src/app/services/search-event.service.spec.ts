import { TestBed } from '@angular/core/testing';

import { SearchEventService } from './Events/search-event.service';

describe('SearchEventService', () => {
  let service: SearchEventService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SearchEventService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
