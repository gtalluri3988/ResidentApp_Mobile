import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BillsPaymentsComponent } from './bills-payments.component';

describe('BillsPaymentsComponent', () => {
  let component: BillsPaymentsComponent;
  let fixture: ComponentFixture<BillsPaymentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BillsPaymentsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BillsPaymentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
