import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-buttons',
  imports: [CommonModule],
  templateUrl: './buttons.html',
  styleUrl: './buttons.scss',
})
export class Buttons {
  @Input() type: 'button' | 'submit' | 'reset' = 'button';

  @Input() variant:
    | 'search'
    | 'add'
    | 'edit'
    | 'auth'
    | 'delete'
    | 'secondary'
    | 'save'
    | 'cancel' = 'search';

  @Input() icon = '';

  @Input() disabled = false;

  @Output() buttonClick = new EventEmitter<void>();

  onClick(): void {
    this.buttonClick.emit();
  }
}
