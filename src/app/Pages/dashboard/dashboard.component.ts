import { NgFor } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { AuthService } from '@services/AuthService/auth.service';
import { RouterLink, RouterLinkActive, Router, NavigationStart, NavigationEnd } from '@angular/router';
import { ResidentService } from '@services/ResidentService/resident.service';
import { CommunityService } from '@services/CommunityService/community.service';
import { UpperCasePipe } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, NgFor, UpperCasePipe],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit {
  residentDetails: any;
  communityDetails: any;
  auth = inject(AuthService);
  router = inject(Router);
  residentService = inject(ResidentService);
  communityService = inject(CommunityService);
  slideIndex = 0;
  complaintDetails: any;
  userCommunity: string = "";
  userResidentId: string = "";

  constructor() {
    this.userResidentId = this.auth.getUserId();
    this.userCommunity = this.auth.getUserCommunity();
    this.bindResidentDetails();
    this.bindCommunityDetails();
  }
  slides = [
    {
      title: 'News & Announcement',
      subtitle: 'News title | 22/01/2025',
      content: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga recusandae animi...'
    },
    {
      title: 'News & Announcement',
      subtitle: 'News title | 22/01/2025',
      content: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga recusandae animi...'
    },
    {
      title: 'News & Announcement',
      subtitle: 'News title | 22/01/2025',
      content: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga recusandae animi...'
    }
  ];

  menuItems = [
    { title: 'Visitor', subtitle: 'Add New', logo: 'assets/images/menu-item-visitor.png', url: '/manage-visitor' },
    { title: 'Facilities', subtitle: 'Book Now', logo: 'assets/images/menu-item-facilities.png', url: '/resident-profile-facility' },
    { title: 'Events', subtitle: 'Add New', logo: 'assets/images/menu-item-event.png', url: '/create-event' },
    { title: 'Complaints', subtitle: 'Submit Complaint', logo: 'assets/images/menu-item-complaint.png', url: '/create-complaint' }
  ];

  bottomMenuButtons = [
    { name: 'Bills', url: '/resident-bills', logo: 'assets/images/menu-item-bill.png' },
    { name: 'Notification', url: '/resident-notifications', logo: 'assets/images/menu-item-notification.png' },
    { name: 'Profile', url: '/resident-Profile', logo: 'assets/images/menu-item-profile.png' }
  ];

  ngOnInit() {
    this.autoSlide();
  }

  currentSlide(index: number) {
    this.slideIndex = index;
  }

  autoSlide() {
    setInterval(() => {
      this.slideIndex = (this.slideIndex + 1) % this.slides.length;
    }, 3500);
  }

  logout() {
    this.auth.logout();
    this.router.navigate(['/login']); // Redirect to login page
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

  bindCommunityDetails() {

    this.communityService.getCommunityById(this.userCommunity).subscribe({
      next: (response) => {
        this.communityDetails = response;
      },
      error: (error) => {
        console.error('Error:', error);
      }
    });

  }


}

