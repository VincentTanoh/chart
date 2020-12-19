import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NotFoundErrorPageComponent } from './not-found-error-page.component';

describe('NotFoundErrorPageComponent', () => {
  let component: NotFoundErrorPageComponent;
  let fixture: ComponentFixture<NotFoundErrorPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NotFoundErrorPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NotFoundErrorPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
