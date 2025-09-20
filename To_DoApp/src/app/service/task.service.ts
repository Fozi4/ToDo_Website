import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Task } from '../model/task.model';

@Injectable({ providedIn: 'root' })
export class TaskService {
  private apiUrl = 'https://localhost:7294/api/TaskItem';

  constructor(private http: HttpClient) {}

  getAll(): Observable<Task[]> {
    return this.http.get<Task[]>(this.apiUrl);
  }

  create(taskName: string): Observable<Task> {
    return this.http.post<Task>(this.apiUrl, { taskName, isComplete: false });
  }

  update(task: Task): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/${task.taskId}`, task);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  searchByName(name: string): Observable<Task[]> {
    return this.http.get<Task[]>(`${this.apiUrl}/search?q=${name}`);
  }
}
