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
import { ComplaintService } from '@services/ComplaintService/complaint.service';
import { ResidentService } from '@services/ResidentService/resident.service';

@Component({
  selector: 'app-complaint-email',
  standalone: true,
  imports: [NgFor, FormsModule, NgIf, ReactiveFormsModule, RouterModule, DatePipe],
  templateUrl: './complaint-email.component.html',
  styleUrl: './complaint-email.component.css'
})
export class ComplaintEmailComponent {
  complaintDetails: any;
  residentDetails: any;
  complaintId: string = "";
  formSubmitted = false;
  complaintForm: FormGroup;
  showModal = false;
  baseService = inject(BaseService);
  submitted = false;
  fb = inject(FormBuilder);
  auth = inject(AuthService);
  complaintService = inject(ComplaintService);
  residentService = inject(ResidentService);
  router = inject(Router);
  route = inject(ActivatedRoute);
  userCommunity: string = "";
  userResidentId: string = "";

  constructor() {
    this.userResidentId = this.auth.getUserId();
    this.userCommunity = this.auth.getUserCommunity();
    this.complaintForm = new FormGroup({

    });
    this.complaintId = this.route.snapshot.paramMap.get('id') || '';
    this.bindVisitorDetails();
    this.bindResidentDetails();
  }

  get f() {
    return this.complaintForm.controls;
  }

  getFormGroup(control: any): FormGroup {
    return control as FormGroup;
  }

  bindVisitorDetails() {

    this.complaintService.getComplaintByComplaintId(this.complaintId).subscribe({
      next: (response) => {
        this.complaintDetails = response;
      },
      error: (error) => {
        console.error('Error:', error);
      }
    });

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


}


