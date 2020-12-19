import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewTravelPageComponent } from './view-travel-page.component';

describe('ViewTravelPageComponent', () => {
  let component: ViewTravelPageComponent;
  let fixture: ComponentFixture<ViewTravelPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewTravelPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewTravelPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
