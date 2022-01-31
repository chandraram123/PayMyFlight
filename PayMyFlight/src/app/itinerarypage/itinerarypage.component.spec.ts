import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ItinerarypageComponent } from './itinerarypage.component';

describe('ItinerarypageComponent', () => {
  let component: ItinerarypageComponent;
  let fixture: ComponentFixture<ItinerarypageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ItinerarypageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ItinerarypageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
