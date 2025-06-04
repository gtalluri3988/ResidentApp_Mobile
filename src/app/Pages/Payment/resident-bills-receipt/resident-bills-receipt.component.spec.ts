import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResidentBillsReceiptComponent } from './resident-bills-receipt.component';

describe('ResidentBillsReceiptComponent', () => {
  let component: ResidentBillsReceiptComponent;
  let fixture: ComponentFixture<ResidentBillsReceiptComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ResidentBillsReceiptComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ResidentBillsReceiptComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
