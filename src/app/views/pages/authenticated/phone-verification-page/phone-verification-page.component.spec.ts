import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PhoneVerificationPageComponent } from './phone-verification-page.component';

describe('PhoneVerificationPageComponent', () => {
  let component: PhoneVerificationPageComponent;
  let fixture: ComponentFixture<PhoneVerificationPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PhoneVerificationPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PhoneVerificationPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
