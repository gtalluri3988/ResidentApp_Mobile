import { Component ,inject} from '@angular/core';
import { SpinnerService } from '@services/SpinnerService/spinner.service';
import { AsyncPipe, NgIf } from '@angular/common'; 

@Component({
  selector: 'app-spinner',
  standalone: true,
  imports: [AsyncPipe, NgIf], 
  templateUrl: './spinner.component.html',
  styleUrl: './spinner.component.css'
})
export class SpinnerComponent {
   // Observable for loading state
   spinner = inject(SpinnerService);
   isLoading$ = this.spinner.isLoading$; 
  
 
}
