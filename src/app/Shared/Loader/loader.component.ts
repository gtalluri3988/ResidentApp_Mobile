// import { Component, Input } from '@angular/core';
// import { NgIf } from '@angular/common';
// import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

// @Component({
//   selector: 'app-loader',
//   standalone: true,
//   imports:[NgIf,MatProgressSpinnerModule],
//   template: `
//     <div *ngIf="isLoading" class="loader-container">
//       <mat-spinner *ngIf="useMaterial" diameter="50"></mat-spinner>
//       <div *ngIf="!useMaterial" class="custom-spinner"></div>
//     </div>
//   `,
//   styles: [`
//     .loader-container {
//       position: fixed;
//       top: 0;
//       left: 0;
//       width: 100%;
//       height: 100%;
//       background: rgba(255, 255, 255, 0.8);
//       display: flex;
//       align-items: center;
//       justify-content: center;
//       z-index: 9999;
//     }
//     .custom-spinner {
//       width: 50px;
//       height: 50px;
//       border: 5px solid #f3f3f3;
//       border-top: 5px solid #3498db;
//       border-radius: 50%;
//       animation: spin 1s linear infinite;
//     }
//     @keyframes spin {
//       0% { transform: rotate(0deg); }
//       100% { transform: rotate(360deg); }
//     }
//   `]
// })
// export class LoaderComponent {
//   @Input() isLoading: boolean = false;
//   @Input() useMaterial: boolean = false;
// }