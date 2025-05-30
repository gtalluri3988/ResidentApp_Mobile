import { Component, ElementRef, ViewChild, Input, inject } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { ResidentService } from '@services/ResidentService/resident.service';
import { Router, ActivatedRoute, RouterModule } from '@angular/router';

@Component({
    selector: 'app-selfie-capture',
    standalone: true,
    templateUrl: './selfie-capture.component.html',
    styleUrls: ['./selfie-capture.component.css'],
    imports: [CommonModule]
})
export class SelfieCaptureComponent {
    @ViewChild('video') videoRef!: ElementRef;
    @ViewChild('canvas') canvasRef!: ElementRef;
    capturedImage: SafeUrl | null = null;
    stream: MediaStream | null = null;
    isModalOpen: boolean = false;
    router = inject(Router);
    route = inject(ActivatedRoute);
    @Input() vehicleId!: number;

    constructor(private sanitizer: DomSanitizer, private residentService: ResidentService) {

    }

    openModal() {
        this.isModalOpen = true;
        this.startCamera();
    }

    closeModal() {
        this.isModalOpen = false;
        this.stopCamera();
    }

    async startCamera() {
        try {
            this.stream = await navigator.mediaDevices.getUserMedia({ video: true });
            this.videoRef.nativeElement.srcObject = this.stream;
        } catch (error) {
            console.error('Error accessing camera:', error);
        }
    }

    captureSelfie() {
        const video = this.videoRef.nativeElement;
        const canvas = this.canvasRef.nativeElement;
        const context = canvas.getContext('2d');
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        context.drawImage(video, 0, 0, canvas.width, canvas.height);
        const imageDataUrl = canvas.toDataURL('image/png');
        this.capturedImage = this.sanitizer.bypassSecurityTrustUrl(imageDataUrl);
        const payload = {
            vehicleId: this.vehicleId,
            imageBase64: imageDataUrl
        };
        this.residentService.captureResidentSelfie(payload).subscribe({
            next: (response) => {
                alert("Image Captured");
                this.stopCamera();
                window.location.reload();

            },
            error: (error) => {
                console.error('Error:', error);
            }
        });
        this.isModalOpen = false;
        // this.startCamera();
        // if (this.stream) {
        //     this.stream.getTracks().forEach(track => track.stop());
        //     this.stream = null;
        // }

    }

    stopCamera() {
        if (this.stream) {
            this.stream.getTracks().forEach(track => track.stop());
            this.stream = null;
        }
    }

}
