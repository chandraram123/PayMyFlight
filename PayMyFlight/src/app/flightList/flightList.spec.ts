import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FlightList } from './flightList';

describe('FlightList', () => {
  let component: FlightList;
  let fixture: ComponentFixture<FlightList>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FlightList ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FlightList);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
