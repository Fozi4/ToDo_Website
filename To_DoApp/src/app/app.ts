import { Component, signal } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Auth } from './service/auth';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterModule, CommonModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('To_DoApp');
  isLoggedIn = false;
  user$;
  constructor(private service: Auth) {
    this.user$ = this.service.currentUser$;
    const token = localStorage.getItem('token');
    if(token){
      this.isLoggedIn = true;
    }
  }
  logout(){
    localStorage.removeItem('token');
    this.isLoggedIn = false;
    window.location.reload();
  }
}
