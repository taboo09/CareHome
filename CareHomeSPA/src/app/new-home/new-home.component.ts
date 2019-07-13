import { AlertifyService } from './../_services/alertify.service';
import { HomeService } from './../_services/home.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-new-home',
  templateUrl: './new-home.component.html',
  styleUrls: ['./new-home.component.css']
})
export class NewHomeComponent implements OnInit {
  home:any = {};
  homeForm: FormGroup;

  constructor(private fb: FormBuilder, 
    private homeService: HomeService, 
    private router: Router,
    private alertify: AlertifyService) { }

  ngOnInit() {
    this.createHomeForm();
  }

  getErrorMessageEmail() {
    return this.homeForm.get('email').touched &&
      this.homeForm.get('email').hasError('required') ? 'Email is required' :
      this.homeForm.get('email').hasError('email') ? 'Not a valid email' : 'Email';
  }

  createHomeForm() {
    this.homeForm = this.fb.group({
      name: ['', Validators.required],
      address: ['', Validators.required],
      city: ['', Validators.required],
      email: ['', Validators.email],
      rating: ['', Validators.required]
    });
  }

  addHome() {
    if (this.homeForm.valid) {
      this.home = Object.assign({}, this.homeForm.value);
      this.homeService.addHome(this.home).subscribe(next => {
        this.alertify.success(this.home.name + ' successfully created');
        this.router.navigate(['/home']);
        this.home = {};
      }, error => {
          this.alertify.error(error);
      });
    }
  }

  cancel() {
    this.router.navigate(['/home']);
  }
}
