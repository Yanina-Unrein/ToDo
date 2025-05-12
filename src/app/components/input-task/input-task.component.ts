import { Component, Input, signal } from '@angular/core';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-input-task',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './input-task.component.html',
  styleUrl: './input-task.component.css'
})
export class InputTaskComponent {
  @Input() control!: FormControl;
  @Input() changeHandler!: () => void;

  onEnter() {
    if (this.changeHandler) this.changeHandler();
  }
}
