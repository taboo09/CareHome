import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { qualification } from './../_models/qualification';
import { QualService } from './../_services/qual.service';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AlertifyService } from '../_services/alertify.service';

@Component({
  selector: 'app-edit-qualification',
  templateUrl: './edit-qualification.component.html',
  styleUrls: ['./edit-qualification.component.css']
})
export class EditQualificationComponent implements OnInit {
  qualification: qualification;
  qualForm: FormGroup;
  id: number;
  sub: any;

  constructor(private router: Router,
    private qualService: QualService,
    private fb: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private alertify: AlertifyService) { }

  ngOnInit() {
    this.sub = this.activatedRoute.params.subscribe(params => {
      this.id = params['id'];
    });
    this.getQualification(this.id);

    this.createQualForm();
  }

  createQualForm(){
    this.qualForm = this.fb.group({
      type: ['', Validators.required],
      grade: ['', Validators.required],
      date: ['', Validators.required]
    });
  }

  getQualification(id){
    return this.qualService.findQual(id).subscribe( qual => {
      this.qualification = qual;
    }, error => {
      this.alertify.error(error);
    });
  }

  cancel(){
    this.qualForm.reset();
    this.router.navigate(['/qualification', this.qualification.staffId]);
  }

  editForm(){
    this.qualService.updateQual(this.qualification).subscribe( next => {
      this.alertify.success('Qualification has been updated');
      this.router.navigate(['/qualification', this.qualification.staffId]);
    }, error => {
      this.alertify.error(error);
    });
  }

  delete(){
    this.alertify.confirm('Are you sure you want to delete qualification?', () => {
      this.qualService.deleteQual(this.qualification.id).subscribe( next => {
        this.alertify.message('Qualification has been deleted');
        this.router.navigate(['/qualification', this.qualification.staffId]);
      }, error => {
        this.alertify.error(error);
      })
    });
  }
}
