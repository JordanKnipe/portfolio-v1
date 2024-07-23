import { Component, Input, Output, EventEmitter } from '@angular/core';
import { TodoService } from './todoservice.service';
import { NgClass } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-todo',
  standalone: true,
  imports: [NgClass, FormsModule],
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss']
})
export class TodoComponent {
  @Input() todo: any;
  @Output() delete = new EventEmitter<string>();
  @Output() update = new EventEmitter<{ id: string, itemValue: string }>();
  @Output() fetchTodos = new EventEmitter<void>();

  editing = false;
  editValue: string = '';

  constructor(private todoService: TodoService){}

  onDelete() {
    this.delete.emit(this.todo.itemId);
  }

  completed(todo: any): void {
    let newVal = todo.isComplete === 0 ? 1 : 0;
    console.log(todo.isComplete);
    this.todoService.completeTodo(todo.itemId, 'isComplete', newVal).subscribe({
      next: (response) => {
        console.log('Todo updated successfully', response);
        this.fetchTodos.emit();
      },
      error: (error) => {
        console.error('Failed to update todo', error);
      }
    });
  }

  startEdit() {
    this.editValue = this.todo.itemValue;
    this.editing = true;
  }

  onSave(todo:any) {
    if (this.editValue.trim() !== '') {
      this.todoService.completeTodo(todo.itemId, 'itemValue', this.editValue).subscribe({
        next: (response) => {
          console.log('Todo updated successfully', response);
          this.fetchTodos.emit();
        },
        error: (error) => {
          console.error('Failed to update todo', error);
        }
      });
  }
}
  

  onCancel() {
    this.editing = false;
  }
}
