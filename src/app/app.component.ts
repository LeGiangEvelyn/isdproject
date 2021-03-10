import { Component, OnInit } from '@angular/core';
import TodoHttpService from './services/todo-http.service';

interface Todo {
  complete: boolean;
  id: number;
  name: string;
  description: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title: String = 'Coffee Management App';
  count: number = 5;
  todoContent = '';
  todos: any[];
  constructor(private todoService: TodoHttpService) {}

  ngOnInit(): void {
    this.todoService.getTodos().subscribe((data: any) => {
      this.todos = data;
    });
  }

  addNewTodo(): void {
    if (this.todoContent === '') return;
    this.todos.push({
      name: this.todoContent,
      id: ++this.count,
      complete: false,
      description: 'description.....',
    });
    this.todoContent = '';
    console.log(this.todos);
  }

  addTodoHandler(data): void {
    console.log(data);
    this.addNewTodo();
  }

  onChange(e) {
    this.addNewTodo();
  }

  // onChange(e) {
  //   if (e.key === 'Enter') {
  //     this.addNewTodo();
  //   }
  // }

  handleTodoComplete(todo) {
    this.todos = this.todos.map((item) => {
      if (item.id === todo.id) {
        item.complete = !item.complete;
      }
      return item;
    });
    // console.log(todo);
  }

  handleDelete($event, todo) {
    $event.stopPropagation();
    this.todos = this.todos.filter((item) => item.id !== todo.id);
  }
}
