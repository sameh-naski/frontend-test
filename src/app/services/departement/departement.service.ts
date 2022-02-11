import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DepartementService {
private url = "http://localhost:8080/api/departement"
  constructor(private http : HttpClient) { }


  dep(token) : Observable<any>{
    var headers_object = new HttpHeaders().set("Authorization",token);
    const httpOptions ={
      headers: headers_object
    };
    return this.http.get(this.url,httpOptions);
  }
}
