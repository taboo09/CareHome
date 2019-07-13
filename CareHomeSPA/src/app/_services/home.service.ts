import { home } from './../_models/home';
import { HttpClient } from '@angular/common/http';
import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HomeService {
  baseUrl: string = environment.apiUrl + 'home/';
  home: home;

  constructor(private http: HttpClient) { }

  addHome(home: home){
    return this.http.post(this.baseUrl, home);
  }

  getHomes(){
    return this.http.get<home[]>(this.baseUrl);
  }

  getHome(id){
    return this.http.get<home>(this.baseUrl + id);
  }
}
