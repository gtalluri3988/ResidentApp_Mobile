import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './Shared/AuthGuard/auth.guard';
import { LoginComponent } from './Pages/login/login.component';
import { NgModule } from '@angular/core';
import { DashboardComponent } from './Pages/dashboard/dashboard.component';
import { ManageVisitorComponent } from './Pages/visitor/manage-visitor/manage-visitor.component';
import { VisitorDetailsComponent } from './Pages/visitor/visitor-details/visitor-details.component';
import { VisitorQrComponent } from './Pages/visitor/visitor-qr/visitor-qr.component';
import { ResidentProfileFacilityComponent } from './Pages/facilities/resident-profile-facility/resident-profile-facility.component';
import { FacilityDetailsComponent } from './Pages/facilities/facility-details/facility-details.component';
import { ConfirmFacilityBookingComponent } from './Pages/facilities/confirm-facility-booking/confirm-facility-booking.component';
import { CreateEventComponent } from './Pages/events/create-event/create-event.component';
import { EventDetailsComponent } from './Pages/events/event-details/event-details.component';
import { EventQrComponent } from './Pages/events/event-qr/event-qr.component';
import { CreateComplaintComponent } from './Pages/complaints/create-complaint/create-complaint.component';
import { ComplaintDetailsComponent } from './Pages/complaints/complaint-details/complaint-details.component';
import { ComplaintEmailComponent } from './Pages/complaints/complaint-email/complaint-email.component';
import { ResidentProfileComponent } from './Pages/profile/resident-profile/resident-profile.component';
import { NotificationsComponent } from './Pages/notifications/notifications.component';
import { PaymentResponseComponent } from './Pages/Payment/payment-response/payment-response.component';
import { ForgotPasswordComponent } from './Pages/passwordreset/forgot-password/forgot-password.component';

export const routes: Routes = [

    { path: 'login', component: LoginComponent },

    { path: '', component: LoginComponent },




    { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
    { path: 'manage-visitor', component: ManageVisitorComponent, canActivate: [AuthGuard] },
    { path: 'visitor-details/:id', component: VisitorDetailsComponent, canActivate: [AuthGuard] },
    { path: 'visitor-qr/:id', component: VisitorQrComponent, canActivate: [AuthGuard] },
    { path: 'resident-profile-facility', component: ResidentProfileFacilityComponent, canActivate: [AuthGuard] },
    { path: 'facility-details/:id', component: FacilityDetailsComponent, canActivate: [AuthGuard] },
    { path: 'confirm-facility-booking/:id', component: ConfirmFacilityBookingComponent, canActivate: [AuthGuard] },
    { path: 'create-event', component: CreateEventComponent, canActivate: [AuthGuard] },
    { path: 'event-details/:id', component: EventDetailsComponent, canActivate: [AuthGuard] },
    { path: 'event-qr/:id', component: EventQrComponent, canActivate: [AuthGuard] },
    { path: 'create-complaint', component: CreateComplaintComponent, canActivate: [AuthGuard] },
    { path: 'complaint-details/:id', component: ComplaintDetailsComponent, canActivate: [AuthGuard] },
    { path: 'complaint-email/:id', component: ComplaintEmailComponent, canActivate: [AuthGuard] },
    { path: 'resident-Profile', component: ResidentProfileComponent, canActivate: [AuthGuard] },
    { path: 'resident-notifications', component: NotificationsComponent, canActivate: [AuthGuard] },
    { path: 'paymentresponse', component: PaymentResponseComponent },
    { path: 'forgot-password', component: ForgotPasswordComponent, canActivate: [AuthGuard] },
    // {
    //     path: '', component: DashboardComponent, canActivate: [AuthGuard],
    //     children: [



    //         { path: 'dashboard', component: DashboardComponent },


    //     ]
    // }


];
export function hasRoute(path: string): boolean {
    return routes.some(route => route.path === path);
}