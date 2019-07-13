import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { staff } from '../_models/staff';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StaffService {
  baseUrl: string = environment.apiUrl + 'staff/';

  constructor(private http: HttpClient) { }

  addStaff(staff: staff){
    return this.http.post(this.baseUrl, staff);
  }

  updateStaff(staff: staff){
    return this.http.put(this.baseUrl, staff);
  }

  findStaff(id): Observable<staff> {
    return this.http.get<staff>(this.baseUrl + id);
  }

  deleteStaff(id) {
    return this.http.delete(this.baseUrl + id);
  }
}
