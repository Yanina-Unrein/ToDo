import { Component, Input } from '@angular/core';
import { InputTaskComponent } from "../input-task/input-task.component";
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header',
 standalone: true,
  imports: [CommonModule, InputTaskComponent, ReactiveFormsModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  @Input() control!: FormControl;
  @Input() changeHandler!: () => void;
}
