import { TestBed } from '@angular/core/testing';

import { ComponentLayoutServiceService } from './component-layout-service.service';

describe('ComponentLayoutServiceService', () => {
  let service: ComponentLayoutServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ComponentLayoutServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
