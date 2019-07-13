import { qualification } from './../_models/qualification';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class QualService {
  baseUrl: string = environment.apiUrl + 'qual/';

  constructor(private http: HttpClient) { }

  addQual(qual: qualification){
    return this.http.post(this.baseUrl, qual);
  }

  updateQual(qual: qualification){
    return this.http.put(this.baseUrl, qual);
  }

  findQual(id): Observable<qualification> {
    return this.http.get<qualification>(this.baseUrl + id);
  }

  deleteQual(id) {
    return this.http.delete(this.baseUrl + id);
  }
}
