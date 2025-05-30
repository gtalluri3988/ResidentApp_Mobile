import { Component, inject, OnInit, ViewChild, AfterViewInit, ElementRef } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DatePipe, NgFor, NgIf } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { DistinctPipe } from 'src/app/Shared/Pipes/distinct.pipe';
import { SortDescPipe } from 'src/app/Shared/Pipes/sort-desc.pipe';
import { QRCodeModule } from 'angularx-qrcode';
import { VisitorService } from '@services/VisitorService/visitor.service';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

@Component({
  selector: 'app-visitor-qr',
  standalone: true,
  imports: [NgFor, FormsModule, NgIf, ReactiveFormsModule, RouterModule, DistinctPipe, SortDescPipe, QRCodeModule, DatePipe
  ],
  templateUrl: './visitor-qr.component.html',
  styleUrl: './visitor-qr.component.css'
})
export class VisitorQrComponent implements AfterViewInit {

  visitorDetails: any;
  qrData: string = '';
  visitorId: string = "";
  qrCodeSize: number = 356;
  route = inject(ActivatedRoute);
  visitorService = inject(VisitorService);
  //@ViewChild('qrcodeEl', { static: false }) qrCodeElement!: ElementRef;

  ngAfterViewInit() {

  }
  constructor() {
    this.visitorId = this.route.snapshot.paramMap.get('id') || '';
    this.bindVisitorDetails();
    this.setQRSize();
    window.addEventListener('resize', this.setQRSize.bind(this));

  }

  @ViewChild('qrcodeEl', { static: false, read: ElementRef }) qrCodeElement!: ElementRef;
  qrRendered = false;


  bindVisitorDetails() {

    this.visitorService.getVisitorById(this.visitorId).subscribe({
      next: (response) => {
        this.visitorDetails = response;
        this.qrData = `Community Name: ${this.visitorDetails?.community.communityName}\nVisitor Name: ${this.visitorDetails?.visitorName}\nVehicle No: ${this.visitorDetails?.vehicleNo}\nVisit Date: ${this.visitorDetails?.visitDate.split(' ')[0]}`;

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

  // downloadQRCode() {


  //   const qrElement = this.qrCodeElement?.nativeElement;
  //   const canvas: HTMLCanvasElement | null = qrElement?.querySelector('canvas');

  //   if (!canvas) {
  //     console.error('❌ Canvas not found inside QR element.');
  //     return;
  //   }

  //   const imgData = canvas.toDataURL('image/png');
  //   const a = document.createElement('a');
  //   a.href = imgData;
  //   a.download = 'qr-code.png';
  //   a.click();
  // }

  downloadQRCode(): void {
    const element = document.getElementById('print-section');
    if (!element) return;

    // Add print styles
    element.classList.add('force-print-style');

    html2canvas(element).then(canvas => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');

      const imgProps = pdf.getImageProperties(imgData);
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

      pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
      pdf.save('VisitorQRCode.pdf');

      element.classList.remove('force-print-style');
    });
  }


}
