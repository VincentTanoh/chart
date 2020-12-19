import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewCarrierPageComponent } from './view-carrier-page.component';

describe('ViewCarrierPageComponent', () => {
  let component: ViewCarrierPageComponent;
  let fixture: ComponentFixture<ViewCarrierPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewCarrierPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewCarrierPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
