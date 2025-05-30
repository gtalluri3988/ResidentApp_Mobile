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
import { ComplaintService } from '@services/ComplaintService/complaint.service';
import { ComplaintModel } from '@model/complaint-detail.model';

@Component({
  selector: 'app-create-complaint',
  standalone: true,
  imports: [NgFor, FormsModule, NgIf, ReactiveFormsModule, RouterModule],
  templateUrl: './create-complaint.component.html',
  styleUrl: './create-complaint.component.css'
})
export class CreateComplaintComponent {
  currentDate: Date = new Date();
  userResidentId: string = '';
  formSubmitted = false;
  complaintForm: FormGroup;
  showModal = false;
  baseService = inject(BaseService);
  submitted = false;
  fb = inject(FormBuilder);
  auth = inject(AuthService);
  complaintService = inject(ComplaintService);
  router = inject(Router);
  route = inject(ActivatedRoute);
  userCommunity: string = "";
  modalImageSrc = '';

  constructor() {
    this.userCommunity = this.auth.getUserCommunity();
    this.userResidentId = this.auth.getUserId();
    this.complaintForm = new FormGroup({
      complaintTypeId: new FormControl(''),
      description: new FormControl(''),
      complaintPhotos: this.fb.array<FormGroup>([]),
    });
    this.bindComplaintType("ComplaintType");
  }

  get f() {
    return this.complaintForm.controls;
  }

  get complaintPhotos(): FormArray {

    var fg = this.complaintForm.get('complaintPhotos') as FormArray<FormGroup>;
    return this.complaintForm.get('complaintPhotos') as FormArray<FormGroup>;
  }


  getFormGroup(control: any): FormGroup {
    return control as FormGroup;
  }

  saveComplaint() {

    Object.values(this.complaintForm.controls).forEach(control => {
      control.markAsTouched();
      control.updateValueAndValidity();
    });
    this.submitted = true;
    if (this.complaintForm.valid) {
      // const formValues: any = this.complaintForm.value;
      const formData = new FormData();
      const formValues: ComplaintModel = this.complaintForm.getRawValue();
      formValues.communityId = this.userCommunity ?? "";
      formValues.complaintStatusId = 1;
      formValues.residentId = parseInt(this.userResidentId);
      formData.append('complainRefNo', formValues.complainRefNo || '');
      formData.append('description', formValues.description || '');
      formData.append('complaintTypeId', formValues.complaintTypeId.toString() || '');
      // formValues.complaintPhotos.forEach((image, index) => {
      //   formData.append(`file_${index}`, image.file);
      // });
      this.complaintService.saveComplaint(formValues).subscribe({
        next: (response) => {

          this.router.navigate(['/complaint-details', response.id]);
        },
        error: (error) => {
          console.error('Error:', error);
        }
      });

    }
  }

  bindComplaintType(Type: any) {
    this.baseService.getDropDownTypeList(Type).subscribe({
      next: (data) => this.baseService.complaintTypeDropDown = data,
      error: (err) => console.error('Error fetching dropdown data:', err)
    });
  }

  onFileChange(event: any) {
    const files = event.target.files;
    for (let file of files) {
      const reader = new FileReader();
      reader.onload = () => {
        this.complaintPhotos.push(
          this.fb.group({
            file: new FormControl(file), // Store file object
            name: new FormControl(reader.result),
            preview: reader.result as string// Store Base64 preview
          })
        );
      };
      reader.readAsDataURL(file);
    }
  }

  removeImage(index: number) {
    this.complaintPhotos.removeAt(index);
  }
  openImageModal(src: string) {
    this.modalImageSrc = src;
    this.showModal = true;
  }

  closeImageModal() {
    this.showModal = false;
  }


}


