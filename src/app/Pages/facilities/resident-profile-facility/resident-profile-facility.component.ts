import { Component, inject, OnInit } from '@angular/core';
import { FormsModule, NgModel } from '@angular/forms';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DatePipe, NgFor, NgIf } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { FormControl } from '@angular/forms';
import { BaseService } from '@services/BaseService/base.service';
import { AuthService } from '@services/AuthService/auth.service';
import { Router, ActivatedRoute, RouterModule } from '@angular/router';
import { VisitorService } from '@services/VisitorService/visitor.service';
import { VisitorModel } from '@model/visitor.model';
import { FacilityService } from '@services/FacilityService/facility.service';

@Component({
  selector: 'app-resident-profile-facility',
  standalone: true,
  imports: [NgFor, FormsModule, NgIf, ReactiveFormsModule, RouterModule, DatePipe],
  templateUrl: './resident-profile-facility.component.html',
  styleUrl: './resident-profile-facility.component.css'
})
export class ResidentProfileFacilityComponent {
  facilityDetails: any;
  visitorId: string = "";
  formSubmitted = false;
  showModal = false;
  baseService = inject(BaseService);
  submitted = false;
  fb = inject(FormBuilder);
  auth = inject(AuthService);
  facilityService = inject(FacilityService);
  router = inject(Router);
  route = inject(ActivatedRoute);
  userCommunity: string = "";
  facilityForm: FormGroup;

  constructor() {
    this.userCommunity = this.auth.getUserCommunity();
    this.facilityForm = new FormGroup({
      facilityTypeId: new FormControl(''),

    });
    this.bindFacilityType("FacilityType");
    this.bindFacilityDetails();
  }

  get f() {
    return this.facilityForm.controls;
  }

  getFormGroup(control: any): FormGroup {
    return control as FormGroup;
  }

  bindFacilityDetails() {

    this.facilityService.GetfacilityListByCommunityIdAsync(this.userCommunity).subscribe({
      next: (response) => {
        this.facilityDetails = response;
      },
      error: (error) => {
        console.error('Error:', error);
      }
    });

  }

  onFacilityTypeChange(event: Event) {
    const selectedValue = (event.target as HTMLSelectElement).value;
    this.facilityService.GetAllFacilitiesByfacilityTypeIdAsync(this.userCommunity, selectedValue).subscribe({
      next: (response) => {
        this.facilityDetails = response;
      },
      error: (error) => {
        console.error('Error:', error);
      }
    });

  }

  bindFacilityType(Type: any) {
    this.baseService.getDropDownTypeList(Type).subscribe({
      next: (data) => this.baseService.facilityTypeDropDown = data,
      error: (err) => console.error('Error fetching dropdown data:', err)
    });
  }

}

