import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResidentRedirectPaymentComponent } from './resident-redirect-payment.component';

describe('ResidentRedirectPaymentComponent', () => {
  let component: ResidentRedirectPaymentComponent;
  let fixture: ComponentFixture<ResidentRedirectPaymentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ResidentRedirectPaymentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ResidentRedirectPaymentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
