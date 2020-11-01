import { TestBed } from '@angular/core/testing';

import { PortfoliomanagerService } from './portfoliomanager.service';

describe('PortfoliomanagerService', () => {
  let service: PortfoliomanagerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PortfoliomanagerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
