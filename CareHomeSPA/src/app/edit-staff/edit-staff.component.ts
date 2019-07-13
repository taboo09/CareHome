import { AlertifyService } from './../_services/alertify.service';
import { staff } from './../_models/staff';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup, NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { StaffService } from '../_services/staff.service';

@Component({
  selector: 'app-edit-staff',
  templateUrl: './edit-staff.component.html',
  styleUrls: ['./edit-staff.component.css']
})
export class EditStaffComponent implements OnInit {
  staffForm: FormGroup;
  staff: any;
  editForm: NgForm;
  id: number;
  sub: import("f:/Projects/CSharp/CareHome/CareHomeSPA/node_modules/rxjs/internal/Subscription").Subscription;

  constructor(private fb: FormBuilder, 
    private activatedRouter: ActivatedRoute,
    private router: Router,
    private staffService: StaffService,
    private alertify: AlertifyService) { }

  ngOnInit() {
    this.sub = this.activatedRouter.params.subscribe(params => {
      this.id = params['id'];
    });

    this.findStaff(this.id);

    this.editStaffForm();
  }

  editStaffForm(){
    this.staffForm = this.fb.group({
      forename: ['', Validators.required],
      surname: ['', Validators.required],
      dateOfBirth: ['', Validators.required],
      jobTitle: ['', Validators.required],
      annualSalary: ['']
    });
  }

  findStaff(id: number) {
    this.staffService.findStaff(id).subscribe(staff => {
      this.staff = Object.assign({}, staff);
    }, error => {
      this.alertify.error(error);
    });
  }


  editStaff(staff: staff) {
    this.staffService.updateStaff(this.staff).subscribe(next => {
      this.alertify.success('Staff has been updated');
      this.router.navigate(['/home-card', this.staff.homeId]);
    }, error => {
      this.alertify.error(error);
    });
  }

  deleteStaff() {
    this.alertify.confirm('Are you sure you want to delete qualification?', () => {
      this.staffService.deleteStaff(this.id).subscribe(next => {
        this.alertify.message('Staff has been deleted');
        this.router.navigate(['/home-card', this.staff.homeId]);
      }, error => {
        this.alertify.error(error);
      })
    });
  }
  
}
