import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchTravelPageComponent } from './search-travel-page.component';

describe('SearchTravelPageComponent', () => {
  let component: SearchTravelPageComponent;
  let fixture: ComponentFixture<SearchTravelPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchTravelPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchTravelPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
