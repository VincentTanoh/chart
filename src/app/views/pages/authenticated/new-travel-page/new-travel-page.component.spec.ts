import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewTravelPageComponent } from './new-travel-page.component';

describe('NewTravelPageComponent', () => {
  let component: NewTravelPageComponent;
  let fixture: ComponentFixture<NewTravelPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewTravelPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewTravelPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
