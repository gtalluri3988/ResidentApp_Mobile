import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComplaintEmailComponent } from './complaint-email.component';

describe('ComplaintEmailComponent', () => {
  let component: ComplaintEmailComponent;
  let fixture: ComponentFixture<ComplaintEmailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ComplaintEmailComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ComplaintEmailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
