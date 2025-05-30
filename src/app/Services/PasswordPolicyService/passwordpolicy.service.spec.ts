import { TestBed } from '@angular/core/testing';

import { PasswordpolicyService } from './passwordpolicy.service';

describe('PasswordpolicyService', () => {
  let service: PasswordpolicyService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PasswordpolicyService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
