import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VisitorQrComponent } from './visitor-qr.component';

describe('VisitorQrComponent', () => {
  let component: VisitorQrComponent;
  let fixture: ComponentFixture<VisitorQrComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VisitorQrComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VisitorQrComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
