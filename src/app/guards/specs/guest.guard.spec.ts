import { TestBed } from '@angular/core/testing';

import { GuestGuard } from '../guest.guard';

describe('GuestGuardGuard', () => {
  let guard: GuestGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(GuestGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
