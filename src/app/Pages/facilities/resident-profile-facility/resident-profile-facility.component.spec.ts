import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResidentProfileFacilityComponent } from './resident-profile-facility.component';

describe('ResidentProfileFacilityComponent', () => {
  let component: ResidentProfileFacilityComponent;
  let fixture: ComponentFixture<ResidentProfileFacilityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ResidentProfileFacilityComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ResidentProfileFacilityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
