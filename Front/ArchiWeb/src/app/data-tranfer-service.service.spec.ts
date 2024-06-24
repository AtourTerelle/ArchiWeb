import { TestBed } from '@angular/core/testing';

import { DataTranferServiceService } from './data-tranfer-service.service';

describe('DataTranferServiceService', () => {
  let service: DataTranferServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DataTranferServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
