import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-payment-response',
  standalone: true,
  imports: [],
  templateUrl: './payment-response.component.html',
  styleUrl: './payment-response.component.css'
})
export class PaymentResponseComponent implements OnInit {
  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    // If &Pay redirects with query params, you can read them here
    this.route.queryParams.subscribe(params => {
      console.log('Payment response:', params);
      // Optionally handle txId, status, etc.
    });
  }
}