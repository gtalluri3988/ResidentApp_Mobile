import { Component, inject, OnInit, ViewChild, AfterViewInit, ViewChildren, QueryList } from '@angular/core';
import { FormsModule, NgModel } from '@angular/forms';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DatePipe, NgFor, NgIf, CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { FormControl } from '@angular/forms';
import { BaseService } from '@services/BaseService/base.service';
import { AuthService } from '@services/AuthService/auth.service';
import { Router, ActivatedRoute, RouterModule } from '@angular/router';
import { VisitorService } from '@services/VisitorService/visitor.service';
import { VisitorModel } from '@model/visitor.model';
import { ResidentService } from '@services/ResidentService/resident.service';
import { FacilityService } from '@services/FacilityService/facility.service';
import { SelfieCaptureComponent } from './selfie-capture.component';

@Component({
  selector: 'app-resident-profile',
  standalone: true,
  imports: [NgFor, FormsModule, NgIf, ReactiveFormsModule, RouterModule, DatePipe, SelfieCaptureComponent, CommonModule],
  templateUrl: './resident-profile.component.html',
  styleUrl: './resident-profile.component.css'
})
export class ResidentProfileComponent implements AfterViewInit {

  @ViewChildren(SelfieCaptureComponent) selfieComponents!: QueryList<SelfieCaptureComponent>;

  ngAfterViewInit() {
    if (!this.selfieComponents) {
      console.error("selfieCapture component is not initialized!");
    }
  }
  modalImageSrc = '';
  facilityDetails: any;
  residentDetails: any;
  facilityId: string = "";
  formSubmitted = false;
  visitorForm: FormGroup;
  showModal = false;
  baseService = inject(BaseService);
  submitted = false;
  fb = inject(FormBuilder);
  auth = inject(AuthService);
  residentService = inject(ResidentService);
  facilityService = inject(FacilityService);
  router = inject(Router);
  route = inject(ActivatedRoute);
  userCommunity: string = "";
  userResidentId: string = "";

  constructor() {
    this.userResidentId = this.auth.getUserId();
    this.userCommunity = this.auth.getUserCommunity();
    this.visitorForm = new FormGroup({
      visitorName: new FormControl(''),
      visitorAccessTypeId: new FormControl(''),
      visitDate: new FormControl(''),
      vehicleNo: new FormControl(''),
      visitPurpose: new FormControl(''),
    });
    this.bindVisitorType("VisitorAccessType");
    this.facilityId = this.route.snapshot.paramMap.get('id') || '';
    this.bindResidentDetails();
    //this.bindfacilityDetails();
  }

  get f() {
    return this.visitorForm.controls;
  }

  getFormGroup(control: any): FormGroup {
    return control as FormGroup;
  }

  bindResidentDetails() {

    this.residentService.GetResidentsByResidentIdAsync(this.userResidentId).subscribe({
      next: (response) => {
        this.residentDetails = response;
      },
      error: (error) => {
        console.error('Error:', error);
      }
    });

  }

  bindVisitorType(Type: any) {
    this.baseService.getDropDownTypeList(Type).subscribe({
      next: (data) => this.baseService.visitorTypeDropDown = data,
      error: (err) => console.error('Error fetching dropdown data:', err)
    });
  }

  // openSelfieModal(index: number) {
  //   console.log("Opening selfie modal for row:", index);
  //   this.selfieCapture.openModal();
  // }

  openSelfieModal(index: number) {
    const selfieComponent = this.selfieComponents.get(index);
    if (selfieComponent) {
      selfieComponent.openModal();
    } else {
      console.error('Selfie component not found at index', index);
    }

  }

  viewImage(vehicleId: any) {

    this.residentService.GetVehicleSelfieByIdAsync(vehicleId).subscribe({
      next: (response: any) => {
        this.openImageModal(response.imageBase64);
      },
      error: (err) => {
        console.error('Failed to fetch image', err);
      }
    });
  }

  openImageModal(src: string) {
    this.modalImageSrc = src;
    this.showModal = true;
  }

  closeImageModal() {
    this.showModal = false;
  }

}

