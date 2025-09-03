import { Routes } from '@angular/router';
import { HomeComponent } from './home/home';
import { TaskItemsComponent } from './task-items/task-items';
import { LoginComponent } from './login/login'
import { RegisterComponent } from './register/register'
export const routes: Routes = [
  { path: '', component: HomeComponent },       // Main Page
  { path: 'tasks', component: TaskItemsComponent }, // Tasks Page
  { path: 'login', component: LoginComponent }, // Login Page
  { path: 'register', component: RegisterComponent } // Register Page
];
