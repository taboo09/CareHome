import { EditStaffComponent } from './edit-staff/edit-staff.component';
import { NewHomeComponent } from './new-home/new-home.component';
import { HomeComponent } from './home/home.component';
import { Routes } from '@angular/router';
import { NewStaffComponent } from './new-staff/new-staff.component';
import { QualificationComponent } from './qualification/qualification.component';
import { EditQualificationComponent } from './edit-qualification/edit-qualification.component';
import { HomeCardComponent } from './home-card/home-card.component';

export const appRoutes: Routes = [
    { path: 'home', component: HomeComponent },
    { path: 'home-card/:id', component: HomeCardComponent },
    { path: 'new-staff/:id', component: NewStaffComponent },
    { path: 'new-home', component: NewHomeComponent },
    { path: 'edit-staff/:id', component: EditStaffComponent },
    { path: 'qualification/:id', component: QualificationComponent },
    { path: 'edit-qualification/:id', component: EditQualificationComponent },
    { path: '**', redirectTo: 'home', pathMatch: 'full' }
]