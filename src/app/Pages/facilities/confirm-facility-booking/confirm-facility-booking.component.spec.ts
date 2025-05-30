import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmFacilityBookingComponent } from './confirm-facility-booking.component';

describe('ConfirmFacilityBookingComponent', () => {
  let component: ConfirmFacilityBookingComponent;
  let fixture: ComponentFixture<ConfirmFacilityBookingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConfirmFacilityBookingComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConfirmFacilityBookingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
