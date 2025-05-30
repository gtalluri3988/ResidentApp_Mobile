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
  selector: 'app-facility-details',
  standalone: true,
  imports: [NgFor, FormsModule, NgIf, ReactiveFormsModule, RouterModule, DatePipe],
  templateUrl: './facility-details.component.html',
  styleUrl: './facility-details.component.css'
})
export class FacilityDetailsComponent {
  modalImageSrc = '';
  facilityDetails: any;
  facilityId: string = "";
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
  userResidentId: string = "";
  facilityForm: FormGroup;

  constructor() {
    this.userResidentId = this.auth.getUserId();
    this.userCommunity = this.auth.getUserCommunity();
    this.facilityForm = new FormGroup({
      startDate: new FormControl(''),
      endDate: new FormControl(''),

    });
    this.facilityId = this.route.snapshot.paramMap.get('id') || '';
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

    this.facilityService.GetfacilityByFacilityIdAsync(this.facilityId).subscribe({
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


  savefacilityBooking() {

    this.formSubmitted = true;
    Object.values(this.facilityForm.controls).forEach(control => {
      control.markAllAsTouched();
      control.updateValueAndValidity();
    });

    if (this.facilityForm.valid) {
      const formData = new FormData();
      const formValues: any = this.facilityForm.value;
      formValues.communityId = parseInt(this.userCommunity);
      formValues.residentId = parseInt(this.userResidentId);
      formValues.facilityId = parseInt(this.facilityId);
      this.facilityService.saveFacilityBooking(formValues).subscribe({
        next: (response) => {
          this.router.navigate(['/confirm-facility-booking', this.facilityId]);

        },
        error: (error) => {
          console.error('Error:', error);
        }
      });
    }

  }

  openImageModal(src: string) {
    this.modalImageSrc = src;
    this.showModal = true;
  }

  closeImageModal() {
    this.showModal = false;
  }

}


