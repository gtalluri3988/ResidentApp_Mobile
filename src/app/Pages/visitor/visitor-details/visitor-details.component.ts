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

@Component({
  selector: 'app-visitor-details',
  standalone: true,
  imports: [NgFor, FormsModule, NgIf, ReactiveFormsModule, RouterModule, DatePipe],
  templateUrl: './visitor-details.component.html',
  styleUrl: './visitor-details.component.css'
})
export class VisitorDetailsComponent {
  visitorDetails: any;
  visitorId: string = "";
  formSubmitted = false;
  visitorForm: FormGroup;
  showModal = false;
  baseService = inject(BaseService);
  submitted = false;
  fb = inject(FormBuilder);
  auth = inject(AuthService);
  visitorService = inject(VisitorService);
  router = inject(Router);
  route = inject(ActivatedRoute);
  userCommunity: string = "";

  constructor() {
    this.userCommunity = this.auth.getUserCommunity();
    this.visitorForm = new FormGroup({
      visitorName: new FormControl(''),
      visitorAccessTypeId: new FormControl(''),
      visitDate: new FormControl(''),
      vehicleNo: new FormControl(''),
      visitPurpose: new FormControl(''),
    });
    this.bindVisitorType("VisitorAccessType");
    this.visitorId = this.route.snapshot.paramMap.get('id') || '';
    this.bindVisitorDetails();
  }

  get f() {
    return this.visitorForm.controls;
  }

  getFormGroup(control: any): FormGroup {
    return control as FormGroup;
  }

  bindVisitorDetails() {

    this.visitorService.getVisitorById(this.visitorId).subscribe({
      next: (response) => {
        this.visitorDetails = response;
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

}

