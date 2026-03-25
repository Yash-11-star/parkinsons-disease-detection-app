import { TestBed } from '@angular/core/testing';

import { SpeechDetectionServiceService } from './speech-detection-service.service';

describe('SpeechDetectionServiceService', () => {
  let service: SpeechDetectionServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SpeechDetectionServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
