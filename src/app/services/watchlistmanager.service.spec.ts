import { TestBed } from '@angular/core/testing';

import { WatchlistmanagerService } from './watchlistmanager.service';

describe('WatchlistmanagerService', () => {
  let service: WatchlistmanagerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WatchlistmanagerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
