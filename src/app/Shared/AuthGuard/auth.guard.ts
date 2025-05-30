import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';
import { AuthService } from '../../Services/AuthService/auth.service';


@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router, @Inject(PLATFORM_ID) private platformId: object) { }

  canActivate(): boolean {
    if (isPlatformBrowser(this.platformId)) { // ✅ Ensures sessionStorage is only accessed in the browser
      debugger;
      if (this.authService.isAuthenticated()) {
        return true;
      }
    }
    this.router.navigate(['/login']);
    return false;
  }
}
