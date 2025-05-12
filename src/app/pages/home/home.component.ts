import { CommonModule } from '@angular/common';
import { Component, computed, effect, signal } from '@angular/core';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { Task } from '../../models/taks.model';
import { HeaderComponent } from "../../components/header/header.component";
import { TaskListComponentComponent } from "../../components/task-list-component/task-list-component.component";
import { TaskFooterComponent } from "../../components/task-footer/task-footer.component";

@Component({
  selector: 'app-home',
  imports: [CommonModule, ReactiveFormsModule, HeaderComponent, TaskListComponentComponent, TaskFooterComponent],
  standalone: true,
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  tasks = signal<Task[]>([]);

  filter = signal<'all' | 'pending' | 'completed'>('all');
  tasksByFilter = computed(() => {
    const filter = this.filter();
    const tasks = this.tasks();
    if (filter === 'pending') {
      return tasks.filter(task => !task.completed);
    } 
    if (filter === 'completed') {
      return tasks.filter(task => task.completed);
    } 
    return tasks;
  });

  newTaskCrtl = new FormControl('',
    { nonNullable: true,
      validators: [
        Validators.required
      ] 
    }
  );

  constructor() {
  if (typeof window !== 'undefined') {
    effect(() => {
      const tasks = this.tasks();
      localStorage.setItem('tasks', JSON.stringify(tasks));
    });
  }
}

ngOnInit() {
  if (typeof window !== 'undefined') {
    const tasks = localStorage.getItem('tasks');
    if (tasks) {
      const parsed = JSON.parse(tasks);
      console.log('Tareas cargadas:', parsed); // 👈 Verifica esto
      this.tasks.set(parsed);
    }
  }
}

  changeHandler() {
    if (this.newTaskCrtl.valid) {
      const value = this.newTaskCrtl.value.trim();
      if (value !== '') {
        this.addTask(value);
        this.newTaskCrtl.setValue('');
      }
    }
  }

  addTask(title: string) {
    const newTask: Task = {
      id: Date.now(),
      title,
      completed: false
    }
    this.tasks.update((tasks) => [...tasks, newTask]);
  }

  deleteTask(index: number) {
    this.tasks.update((tasks) => tasks.filter((task, position) => position !== index));
  }

  updateTask(index: number) {
   this.tasks.update((tasks) => {
      return tasks.map((task, position) => {
        if (position === index) {
          return {
            ...task,
            completed: !task.completed
          }
        }
        return task;
      })
    });
  }

  updateTaskEditingMode(index: number) {
     this.tasks.update((tasks) => {
      return tasks.map((task, position) => {
        if (position === index) {
          return {
            ...task,
            editing: true
          }
        }
        return {
          ...task,
          editing: false
        }

      })
    });
  }

  updateTaskText(index: number, event: Event) {
    const input = event.target as HTMLInputElement;
     this.tasks.update((tasks) => {
      return tasks.map((task, position) => {
        if (position === index) {
          return {
            ...task,
            title: input.value,
            editing: false
          }
        }   
        return task;
      })
    });
  }

  changeFilter(filter: 'all' | 'pending' | 'completed') {
    this.filter.set(filter);
  }

  clearCompletedTasks() {
  this.tasks.update(tasks => tasks.filter(task => !task.completed));
}

}
