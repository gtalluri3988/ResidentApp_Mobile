import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SpinnerService {
  private isLoading = new BehaviorSubject<boolean>(false);
  isLoading$ = this.isLoading.asObservable();  // Expose observable

  show() { this.isLoading.next(true); }
  hide() { this.isLoading.next(false); }
}

export default SpinnerService;