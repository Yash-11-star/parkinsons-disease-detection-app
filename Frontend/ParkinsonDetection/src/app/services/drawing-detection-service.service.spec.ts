import { TestBed } from '@angular/core/testing';

import { DrawingDetectionServiceService } from './drawing-detection-service.service';

describe('DrawingDetectionServiceService', () => {
  let service: DrawingDetectionServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DrawingDetectionServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
