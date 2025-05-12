import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Task } from '../../models/taks.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-task-item',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './task-item.component.html',
  styleUrl: './task-item.component.css'
})
export class TaskItemComponent {
  @Input() task!: Task;
  @Output() toggle = new EventEmitter<void>();
  @Output() delete = new EventEmitter<void>();
  @Output() editMode = new EventEmitter<void>();
  @Output() updateTitle = new EventEmitter<Event>();

  submitEdit(event: Event) {
    this.updateTitle.emit(event);
  }
}
