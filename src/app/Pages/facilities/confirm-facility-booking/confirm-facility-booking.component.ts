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
import { ResidentService } from '@services/ResidentService/resident.service';
import { FacilityService } from '@services/FacilityService/facility.service';
import { PaymentService } from '@services/PaymentService/payment.service';

@Component({
  selector: 'app-confirm-facility-booking',
  standalone: true,
  imports: [NgFor, FormsModule, NgIf, ReactiveFormsModule, RouterModule, DatePipe],
  templateUrl: './confirm-facility-booking.component.html',
  styleUrl: './confirm-facility-booking.component.css'
})
export class ConfirmFacilityBookingComponent {
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
  paymentService = inject(PaymentService);
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
    this.bindfacilityDetails();
  }

  get f() {
    return this.visitorForm.controls;
  }

  getFormGroup(control: any): FormGroup {
    return control as FormGroup;
  }

  bindfacilityDetails() {

    this.facilityService.GetfacilityBookingByFacilityIdAsync(this.facilityId, this.userResidentId).subscribe({
      next: (response) => {
        this.facilityDetails = response;
      },
      error: (error) => {
        console.error('Error:', error);
      }
    });

  }

  savefacilityBooking() {

    this.formSubmitted = true;
    Object.values(this.visitorForm.controls).forEach(control => {
      control.markAllAsTouched();
      control.updateValueAndValidity();
    });

    if (this.visitorForm.valid) {
      const formData = new FormData();
      const formValues: VisitorModel = this.visitorForm.value;
      formValues.communityId = parseInt(this.userCommunity);
      formValues.residentId = parseInt(this.userResidentId);

      this.facilityService.saveFacilityBooking(formValues).subscribe({
        next: (response) => {
          this.router.navigate(['/visitor-details', response.id]);

        },
        error: (error) => {
          console.error('Error:', error);
        }
      });
    }

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

  makePayment() {


    const paymentData = {
      merchantId: '968967686',
      txType: 'SALE',
      txAmount: '15.00',
      txCurrency: 'MYR',
      txChannel: 'CC',
      orderId: 'ORDER123',
      orderRef: 'REF123',
      productList: [
        { name: 'Product 1', qty: 1, amount: '15.00' }
      ],
      custName: 'John Doe',
      custEmail: 'john.doe@example.com',
      custContact: '1234567890',
      redirectUrl: 'https://103.27.86.226/ResidentApp/payment/response',
      webhookUrl: 'http://103.27.86.226/CSAApi/api/payment/webhook'
    };


    this.paymentService.submitPayment(paymentData).subscribe(res => {
      window.location.href = res.checkoutUrl;
    });
  }

}

