import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class Auth {
  private baseURL: string;
  private currentUserSubject = new BehaviorSubject<any>(null);
  public currentUser$: Observable<any> = this.currentUserSubject.asObservable();
  constructor(private http: HttpClient) { 
    this.baseURL = "https://localhost:7294/api";
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      this.currentUserSubject.next(JSON.parse(savedUser));
    }
  }

  createUser(formData:any){
    return this.http.post(this.baseURL + "/signup", formData);
  }

  signIn(formData:any){
    return this.http.post(this.baseURL + "/signin", formData);
  }
  
  setUser(user: any) {
    this.currentUserSubject.next(user);
  }

  getUser() {
    return this.currentUserSubject.value;
  }
}
