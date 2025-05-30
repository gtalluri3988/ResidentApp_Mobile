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
import { EventService } from '@services/EventService/event.service';
import { ResidentService } from '@services/ResidentService/resident.service';

@Component({
  selector: 'app-event-details',
  standalone: true,
  imports: [NgFor, FormsModule, NgIf, ReactiveFormsModule, RouterModule, DatePipe],
  templateUrl: './event-details.component.html',
  styleUrl: './event-details.component.css'
})
export class EventDetailsComponent {
  eventDetails: any;
  residentDetails: any;
  eventId: string = "";
  formSubmitted = false;
  showModal = false;
  baseService = inject(BaseService);
  submitted = false;
  fb = inject(FormBuilder);
  auth = inject(AuthService);
  eventService = inject(EventService);
  residentService = inject(ResidentService);
  router = inject(Router);
  route = inject(ActivatedRoute);
  userCommunity: string = "";
  userResidentId: string = "";
  facilityForm: FormGroup;

  constructor() {
    this.userResidentId = this.auth.getUserId();
    this.userCommunity = this.auth.getUserCommunity();
    this.facilityForm = new FormGroup({
    });
    this.eventId = this.route.snapshot.paramMap.get('id') || '';
    this.bindResidentDetails();
    this.bindEventDetails();
  }

  get f() {
    return this.facilityForm.controls;
  }

  getFormGroup(control: any): FormGroup {
    return control as FormGroup;
  }

  bindEventDetails() {

    this.eventService.getEventById(this.eventId).subscribe({
      next: (response) => {
        this.eventDetails = response;
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


