import { Component } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-home',
  standalone: true,
  templateUrl: './home.html',
  styleUrl: './home.css',
  imports: []
})
export class HomeComponent  {
  constructor(private router: Router) {}

  goToTasks(){
    this.router.navigate(['/tasks'])
  }
}
