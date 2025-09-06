import { Component, OnInit } from '@angular/core';
import { Task } from '../model/task.model';
import { TaskService } from '../service/task.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-task-items',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './task-items.html',
  styleUrl: './task-items.css'
})
export class TaskItemsComponent  implements OnInit {
  newTaskText: string = '';
  tasks: Task[] = [];

  constructor(private taskService: TaskService) {}

  ngOnInit() {
    this.loadTasks();
  }

  loadTasks() {
    this.taskService.getAll().subscribe((data) => {
      this.tasks = data;
    });
  }

  addTask() {
    const name = this.newTaskText.trim();
    if (name) {
      this.taskService.create(name).subscribe(created  => {
        this.tasks.push(created);
        this.newTaskText = '';
      });
    }
    else {
      alert('Task name cannot be empty');
    }
  }

  toggleCompletion(task: Task) {
    const updated = { ...task, isDone: !task.isDone };
    this.taskService.update(updated)
      .subscribe(() => task.isDone = updated.isDone);
  }

  editTask(task: Task) {
    const newName = prompt('Edit task', task.taskName)?.trim();
    if (!newName) return;
    const updated = { ...task, taskName: newName };
    this.taskService.update(updated)
      .subscribe(() => task.taskName = newName);
  }

  deleteTask(taskId: number) {
    this.taskService.delete(taskId)
      .subscribe(() =>
        this.tasks = this.tasks.filter(t => t.taskId !== taskId)
      );
  }
}
