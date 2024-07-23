import { Component, EventEmitter, Output } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';
import { TodoService } from '../todo/todoservice.service';

@Component({
  selector: 'app-todo-form',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './todo-form.component.html',
  styleUrls: ['./todo-form.component.scss']
})
export class TodoFormComponent {
  todoForm!: FormGroup;

  @Output() fetchTodos = new EventEmitter<void>();

  constructor(private fb: FormBuilder, private todoService: TodoService) {
    this.createForm();
  }

  createForm() {
    this.todoForm = this.fb.group({
      text: ['', [Validators.required, this.onlyBasicCharsValidator()]]
    });
  }

  onlyBasicCharsValidator() {
    return (control: AbstractControl): ValidationErrors | null => {
      const valid = /^[A-Za-z ]+$/.test(control.value);
      return valid ? null : { 'invalidCharacters': true };
    };
  }

  onSubmit() {
    if (this.todoForm.valid) {
      const sanitizedInput = this.todoForm.value.text;  // Input is already restricted by validator, so further sanitization may not be needed
      this.todoService.addTodo(sanitizedInput).subscribe(() => {
        this.fetchTodos.emit();
        this.todoForm.reset(); // Reset the form after submission
      });
      console.log('Submitting:', sanitizedInput);
    }
  }
}
