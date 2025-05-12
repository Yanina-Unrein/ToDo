import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Task } from '../../models/taks.model';
import { TaskItemComponent } from "../task-item/task-item.component";
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-task-list-component',
  standalone: true,
  imports: [CommonModule, TaskItemComponent],
  templateUrl: './task-list-component.component.html',
  styleUrl: './task-list-component.component.css'
})
export class TaskListComponentComponent {
  @Input() tasks: Task[] = [];
  @Output() toggle = new EventEmitter<number>();
  @Output() delete = new EventEmitter<number>();
  @Output() editMode = new EventEmitter<number>();
  @Output() updateTitle = new EventEmitter<{ index: number; event: Event }>();
}
