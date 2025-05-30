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
import { EventService } from '@services/EventService/event.service';

@Component({
  selector: 'app-create-event',
  standalone: true,
  imports: [NgFor, FormsModule, NgIf, ReactiveFormsModule, RouterModule],
  templateUrl: './create-event.component.html',
  styleUrl: './create-event.component.css'
})
export class CreateEventComponent {
  userResidentId: string = '';
  formSubmitted = false;
  eventForm: FormGroup;
  showModal = false;
  baseService = inject(BaseService);
  submitted = false;
  fb = inject(FormBuilder);
  auth = inject(AuthService);
  eventService = inject(EventService);
  router = inject(Router);
  route = inject(ActivatedRoute);
  userCommunity: string = "";
  eventStartInputType: string = 'text';
  eventEndInputType: string = 'text';

  constructor() {
    this.userCommunity = this.auth.getUserCommunity();
    this.userResidentId = this.auth.getUserId();
    this.eventForm = new FormGroup({
      eventDescription: new FormControl(''),
      eventStart: new FormControl(''),
      eventEnd: new FormControl(''),

    });

  }

  get f() {
    return this.eventForm.controls;
  }

  getFormGroup(control: any): FormGroup {
    return control as FormGroup;
  }

  saveEvent() {
    this.formSubmitted = true;
    Object.values(this.eventForm.controls).forEach(control => {
      control.markAllAsTouched();
      control.updateValueAndValidity();
    });

    if (this.eventForm.valid) {

      const formValues = this.eventForm.getRawValue();
      formValues.communityId = parseInt(this.userCommunity);
      formValues.residentId = parseInt(this.userResidentId);
      formValues.eventStart = new Date(formValues.eventStart).toISOString()
      formValues.eventEnd = new Date(formValues.eventEnd).toISOString()

      this.eventService.saveEvent(formValues).subscribe({
        next: (response) => {
          this.router.navigate(['/event-details', response.id]);

        },
        error: (error) => {
          console.error('Error:', error);
        }
      });
    }

  }

  resetEventStartType() {
    if (!this.eventForm.get('eventStart')?.value) {
      this.eventStartInputType = 'text';
    }
  }
  resetEventEndType() {
    if (!this.eventForm.get('eventEnd')?.value) {
      this.eventEndInputType = 'text';
    }
  }

}

