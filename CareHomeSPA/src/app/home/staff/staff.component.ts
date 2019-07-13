import { home } from './../../_models/home';
import { Component, OnInit, Input } from '@angular/core';
import { staff } from 'src/app/_models/staff';

@Component({
  selector: 'app-staff',
  templateUrl: './staff.component.html',
  styleUrls: ['./staff.component.css']
})
export class StaffComponent implements OnInit {
  @Input() home: home;
  staffs: staff[];
  displayedColumns: string[] = ['no', 'name', 'dateOfBirth', 'jobTitle', 'annualSalary', 'edit', 'qualifications'];

  constructor() { }

  ngOnInit() {
    this.cloneObj();
  }

  cloneObj(){
    this.staffs = Object.assign([], this.home.staffs);
  }

}
