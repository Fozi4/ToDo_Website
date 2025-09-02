import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TaskItemsComponent } from './task-items/task-items';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, TaskItemsComponent],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('To_DoApp');
}
