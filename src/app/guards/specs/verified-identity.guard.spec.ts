import { TestBed } from '@angular/core/testing';

import { VerifiedIdentityGuard } from '../verified-identity.guard';

describe('VerifiedIdentityGuard', () => {
  let guard: VerifiedIdentityGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(VerifiedIdentityGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
