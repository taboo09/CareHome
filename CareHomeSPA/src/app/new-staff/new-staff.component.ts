import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { StaffService } from '../_services/staff.service';
import { AlertifyService } from '../_services/alertify.service';
import {Subscription}  from "rxjs";

@Component({
  selector: 'app-new-staff',
  templateUrl: './new-staff.component.html',
  styleUrls: ['./new-staff.component.css']
})
export class NewStaffComponent implements OnInit {
  staffForm: FormGroup;
  staff: any = {};
  id: number;
  sub: Subscription;

  constructor(private fb: FormBuilder, 
    private activatedRouter: ActivatedRoute,
    private router: Router,
    private staffService: StaffService,
    private alertify: AlertifyService) { }

  ngOnInit() {
    this.createStaffForm();
    this.sub = this.activatedRouter.params.subscribe(params => {
      this.id = params['id'];
    });
  }

  createStaffForm() {
    this.staffForm = this.fb.group({
      forename: ['', Validators.required],
      surname: ['', Validators.required],
      dateOfBirth: ['', Validators.required],
      jobTitle: ['', Validators.required],
      annualSalary: ['']
    });
  }

  addStaff() {
    if (this.staffForm.valid) {
      this.staff = Object.assign({}, this.staffForm.value);
      this.staff.homeId = this.id;
      this.staffService.addStaff(this.staff).subscribe(next => {
        this.alertify.success('Staff name: ' + this.staff.forename + ' ' + this.staff.surname + ' has been created');
        this.staff = {};
        this.router.navigate(['/home-card', this.id]);
      }, error => {
          this.alertify.error(error);
      });
    }
  }
}
