import { TestBed } from '@angular/core/testing';

import { VerifiedPhoneGuard } from '../verified-phone.guard';

describe('VerifiedPhoneGuard', () => {
  let guard: VerifiedPhoneGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(VerifiedPhoneGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
