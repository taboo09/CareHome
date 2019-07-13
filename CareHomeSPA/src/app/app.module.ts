import { AlertifyService } from './_services/alertify.service';
import { QualService } from './_services/qual.service';
import { HomeService } from './_services/home.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatButtonModule} from '@angular/material/button';
import {MatTableModule} from '@angular/material/table';
import {MatInputModule, MatDatepickerModule, MatNativeDateModule, MatDialogModule, MatSelectModule, MatOptionModule, MatTooltipModule} from '@angular/material';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { NewHomeComponent } from './new-home/new-home.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { StaffComponent } from './home/staff/staff.component';
import { StaffService } from './_services/staff.service';
import { RouterModule } from '@angular/router';
import { appRoutes } from './routes';
import { NewStaffComponent } from './new-staff/new-staff.component';
import { EditStaffComponent } from './edit-staff/edit-staff.component';
import { QualificationComponent } from './qualification/qualification.component';
import { EditQualificationComponent } from './edit-qualification/edit-qualification.component';
import { ErrorInterceptorProvider } from './_services/error.interceptor';
import { HomeCardComponent } from './home-card/home-card.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    StaffComponent,
    NewHomeComponent,
    NewStaffComponent,
    EditStaffComponent,
    QualificationComponent,
    EditQualificationComponent,
    HomeCardComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatTableModule,
    MatInputModule,
    MatDatepickerModule,
    MatDialogModule,
    MatNativeDateModule,
    MatSelectModule,
    MatOptionModule,
    MatTooltipModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [
    HomeService,
    StaffService,
    QualService,
    AlertifyService,
    ErrorInterceptorProvider
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
