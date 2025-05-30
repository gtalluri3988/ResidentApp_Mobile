import { Component, inject, OnInit, ViewChild, AfterViewInit, ElementRef } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DatePipe, NgFor, NgIf } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { DistinctPipe } from 'src/app/Shared/Pipes/distinct.pipe';
import { SortDescPipe } from 'src/app/Shared/Pipes/sort-desc.pipe';
import { QRCodeModule } from 'angularx-qrcode';
import { AuthService } from '@services/AuthService/auth.service';
import { ResidentService } from '@services/ResidentService/resident.service';
import { EventService } from '@services/EventService/event.service';


@Component({
  selector: 'app-event-qr',
  standalone: true,
  imports: [NgFor, FormsModule, NgIf, ReactiveFormsModule, RouterModule, DistinctPipe, SortDescPipe, QRCodeModule, DatePipe],
  templateUrl: './event-qr.component.html',
  styleUrl: './event-qr.component.css'
})
export class EventQrComponent implements AfterViewInit {


  qrData: string = 'https://example.com';
  visitorId: string = "";
  route = inject(ActivatedRoute);
  auth = inject(AuthService);
  eventService = inject(EventService);
  residentService = inject(ResidentService);
  //@ViewChild('qrcodeEl', { static: false }) qrCodeElement!: ElementRef;
  userCommunity: string = "";
  userResidentId: string = "";
  eventId: string = "";
  eventDetails: any;
  residentDetails: any;
  qrCodeSize: number = 356;
  ngAfterViewInit() {
    this.visitorId = this.route.snapshot.paramMap.get('id') || '';
  }
  constructor() {
    this.userResidentId = this.auth.getUserId();
    this.userCommunity = this.auth.getUserCommunity();
    this.eventId = this.route.snapshot.paramMap.get('id') || '';
    this.bindResidentDetails();
    this.bindEventDetails();

    this.setQRSize();
    window.addEventListener('resize', this.setQRSize.bind(this));

  }

  @ViewChild('qrcodeEl', { static: false, read: ElementRef }) qrCodeElement!: ElementRef;
  qrRendered = false;



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


  setQRSize() {
    const width = window.innerWidth;
    this.qrCodeSize = width < 400 ? 400 : 356;
  }

  onQRRendered() {
    console.log('✅ QR code rendered.');
    this.qrRendered = true;
  }


}

