import { Component, OnInit } from '@angular/core';
import { TodoService } from '../todo/todoservice.service';
import { TodoFormComponent } from '../todo-form/todo-form.component';
import { TodoComponent } from '../todo/todo.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-todo-list',
  standalone: true,
  imports: [TodoFormComponent, TodoComponent, CommonModule],
  templateUrl: './todolist.component.html',
  styleUrls: ['./todolist.component.scss']
})
export class TodoListComponent implements OnInit {
  
  todos: any[] = [];
  isLoading = false;
  error = false;

  constructor(private todoService: TodoService) {}

  ngOnInit() {
    this.fetchTodos();
  }

  fetchTodos() {
    this.isLoading = true;
    this.todoService.getTodos().subscribe({
      next: (data: any) => {
        this.todos = data.items;
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Error fetching todos:', err);
        this.error = true;
        this.isLoading = false;
      }
    });
  }


  deleteTodo(itemId: string) {
    this.todoService.deleteTodo(itemId).subscribe(() => {
      this.fetchTodos();
    });
  }

  updateTodo(itemId: string, itemValue: string) {
   // this.todoService.updateTodo(itemId, { itemValue }).subscribe(() => {
   //   this.fetchTodos();
  //  });
  }
}
