import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-task-footer',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './task-footer.component.html',
  styleUrl: './task-footer.component.css'
})
export class TaskFooterComponent {
  @Input() total: number = 0;
  @Input() filtered: number = 0;
  @Input() filter: 'all' | 'pending' | 'completed' = 'all';

  @Output() change = new EventEmitter<'all' | 'pending' | 'completed'>();
  @Output() clearCompleted = new EventEmitter<void>();
}
