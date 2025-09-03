import { Routes } from '@angular/router';
import { HomeComponent } from './home/home';
import { TaskItemsComponent } from './task-items/task-items';

export const routes: Routes = [
  { path: '', component: HomeComponent },       // головна сторінка
  { path: 'tasks', component: TaskItemsComponent } // сторінка тасків
];
