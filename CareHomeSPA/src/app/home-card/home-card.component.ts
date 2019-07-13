import { AlertifyService } from './../_services/alertify.service';
import { HomeService } from './../_services/home.service';
import { Component, OnInit } from '@angular/core';
import { home } from '../_models/home';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-home-card',
  templateUrl: './home-card.component.html',
  styleUrls: ['./home-card.component.css']
})
export class HomeCardComponent implements OnInit {
  home: home;
  id: number;
  sub: any;
  displayedColumns: string[] = ['no', 'name', 'dateOfBirth', 'jobTitle', 'annualSalary', 'edit', 'qualifications'];

  constructor(private router: Router,
    private homeService: HomeService,
    private alertify: AlertifyService,
    private activatedRouter: ActivatedRoute) { }

  ngOnInit() {
    this.sub = this.activatedRouter.params.subscribe(params => {
      this.id = params['id'];
    });

    this.getHome(this.id);
  }

  getHome(id){
    this.homeService.getHome(id).subscribe( home => {
      this.home = home;
    }, error => {
      this.alertify.error(error);
    });
  }

}
