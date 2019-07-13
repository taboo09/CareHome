import { AlertifyService } from './../_services/alertify.service';
import { home } from './../_models/home';
import { HomeService } from './../_services/home.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  homes: home[] = [];
  elementNr: number = 0;

  constructor(private homeService: HomeService,
    private alertify: AlertifyService) { }

  ngOnInit() {
    this.getHomes();
  }

  getHomes() {
    this.homeService.getHomes().subscribe(homes => {
      this.homes = homes;
    }, error => {
      this.alertify.error(error);
    });
  }

  staffDisplay(id: number) {
    if (this.elementNr == id) this.elementNr = 0;
    else this.elementNr = id;
  }
}
