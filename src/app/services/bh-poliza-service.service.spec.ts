import { TestBed } from '@angular/core/testing';

import { BhPolizaServiceService } from './bh-poliza-service.service';

describe('BhPolizaServiceService', () => {
  let service: BhPolizaServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BhPolizaServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
