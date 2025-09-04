import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class LoginComponent {
  constructor(private router: Router) {}
  onSubmit(e: Event) {
    e.preventDefault(); 
    // TODO: виклик бекенда для логіну
    this.router.navigate(['/tasks']); 
  }
  goToRegister(){
    this.router.navigate(['/register'])
  }
}
