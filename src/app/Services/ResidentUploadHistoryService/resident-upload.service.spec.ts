import { TestBed } from '@angular/core/testing';

import { ResidentUploadService } from './resident-upload.service';

describe('ResidentUploadService', () => {
  let service: ResidentUploadService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ResidentUploadService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
