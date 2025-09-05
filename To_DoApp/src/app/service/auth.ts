import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class Auth {
  private baseURL: string;
  constructor(private http: HttpClient) { 
    this.baseURL = "https://localhost:7294/api";
  }

  createUser(formData:any){
    return this.http.post(this.baseURL + "/signup", formData);
  }
}
