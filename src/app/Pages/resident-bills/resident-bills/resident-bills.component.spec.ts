import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResidentBillsComponent } from './resident-bills.component';

describe('ResidentBillsComponent', () => {
  let component: ResidentBillsComponent;
  let fixture: ComponentFixture<ResidentBillsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ResidentBillsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ResidentBillsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
