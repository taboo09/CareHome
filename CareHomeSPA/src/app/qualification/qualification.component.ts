import { qualification } from './../_models/qualification';
import { AlertifyService } from './../_services/alertify.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { staff } from 'src/app/_models/staff';
import { QualService } from './../_services/qual.service';
import { Component, OnInit } from '@angular/core';
import { StaffService } from '../_services/staff.service';
import { ActivatedRoute, Router } from '@angular/router';
import {Subscription}  from "rxjs";

@Component({
  selector: 'app-qualification',
  templateUrl: './qualification.component.html',
  styleUrls: ['./qualification.component.css']
})
export class QualificationComponent implements OnInit {
  staff: staff;
  qualification: any = {};
  staffId: number;
  sub: Subscription;
  displayedColumns: string[] = [];
  qualForm: FormGroup;
  showForm: boolean = false;
  qualificationToEdit: qualification;

  constructor(private staffService: StaffService, 
    private activatedRouter: ActivatedRoute, 
    private fb: FormBuilder, 
    private qualService: QualService, 
    private router: Router,
    private alertify: AlertifyService) { }

  ngOnInit() {
    this.sub = this.activatedRouter.params.subscribe(params => {
      this.staffId = params['id'];
    });

    // this.staff.qualifications = this.qualification[];

    this.getStaff(this.staffId);

    this.displayedColumns = ['no', 'type', 'grade', 'date', 'edit'];

    this.createQualForm();
  }

  createQualForm() {
    this.qualForm = this.fb.group({
      type: ['', Validators.required],
      grade: ['', Validators.required],
      date: ['', Validators.required]
    });
  }

  getStaff(id) {
    return this.staffService.findStaff(id).subscribe(staff => {
      this.staff = staff;
    }, error => {
      this.alertify.error(error);
    });
  }

  addQualification() {
    if (this.qualForm.valid) {
      this.qualification = Object.assign({}, this.qualForm.value);
      this.qualification.staffId = this.staff.id;
      this.qualService.addQual(this.qualification).subscribe(next => {
        this.alertify.success('new qualification added');
        this.getStaff(this.staffId);
        this.showForm = false;
        this.qualification = {};
        this.qualForm.reset();
      }, error => {
        this.alertify.error(error);
      });
    }
  }

  displayForm() {
    this.showForm = !this.showForm;
  }

  cancel() {
    this.qualification = {};
    this.qualForm.reset();
    this.showForm = false;
  }

  getQualification(qual){
    this.qualificationToEdit = qual;
  }

}
