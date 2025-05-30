import { Component, inject, OnInit } from '@angular/core';
import { FormsModule, NgModel } from '@angular/forms';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgFor, NgIf } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { FormControl } from '@angular/forms';
import { BaseService } from '@services/BaseService/base.service';
import { AuthService } from '@services/AuthService/auth.service';
import { Router, ActivatedRoute, RouterModule } from '@angular/router';
import { VisitorService } from '@services/VisitorService/visitor.service';
import { VisitorModel } from '@model/visitor.model';

@Component({
  selector: 'app-manage-visitor',
  standalone: true,
  imports: [NgFor, FormsModule, NgIf, ReactiveFormsModule, RouterModule],
  templateUrl: './manage-visitor.component.html',
  styleUrl: './manage-visitor.component.css'
})
export class ManageVisitorComponent {
  userResidentId: string = '';
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
    this.userResidentId = this.auth.getUserId();
    this.visitorForm = new FormGroup({
      visitorName: new FormControl(''),
      visitorAccessTypeId: new FormControl(''),
      visitDate: new FormControl(null),
      vehicleNo: new FormControl(''),
      visitPurpose: new FormControl(''),
    });
    this.bindVisitorType("VisitorAccessType");
  }

  get f() {
    return this.visitorForm.controls;
  }

  getFormGroup(control: any): FormGroup {
    return control as FormGroup;
  }

  saveVisitor() {
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

      this.visitorService.saveVisitor(formValues).subscribe({
        next: (response) => {
          this.router.navigate(['/visitor-details', response.id]);

        },
        error: (error) => {
          console.error('Error:', error);
        }
      });
    }

  }

  bindVisitorType(Type: any) {
    this.baseService.getDropDownTypeList(Type).subscribe({
      next: (data) => this.baseService.visitorTypeDropDown = data,
      error: (err) => console.error('Error fetching dropdown data:', err)
    });
  }

}

