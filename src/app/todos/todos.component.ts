import { Component, OnDestroy, OnInit } from '@angular/core';
import { Order } from '../models/orders';
import { FirestoreService } from '../services/firestore.service';
// import TodoService from './services/todo.services';
import TodoHttpService from '../services/todo-http.service';

interface Todo {
  complete: boolean;
  id: number;
  name: string;
  description: string;
}

@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.css'],
})
export class TodosComponent implements OnInit {
  count: number = 0;
  orders: any = [];
  constructor(private db: FirestoreService) {}

  ngOnInit(): void {
    this.db.getOrders().subscribe((data) => {
      // data['date'].toDateString();
      this.orders = data;
      console.log();
      
    });
    
  }


  ngOndestroy(): void {
    console.log('Destroy Todos');
  }

  // addNewTodo(): void {
  //   if (this.todoContent === '') return;
  //   this.todos.unshift({
  //     title: this.todoContent,
  //     id: ++this.count,
  //     complete: false,
  //     body: 'Date',
  //   });
  //   this.todoContent = '';
  //   console.log(this.todos);
  // }

  // addTodoHandler(data): void {
  //   console.log(data);
  //   this.addNewTodo();
  // }

  // onChange(e) {
  //   this.addNewTodo();
  // }

  // onChange(e) {
  //   if (e.key === 'Enter') {
  //     this.addNewTodo();
  //   }
  // }

  // handleTodoComplete(event, todo) {
  //   event.stopPropagation();
  //   this.todos = this.todos.map((item) => {
  //     if (item.id === todo.id) {
  //       item.complete = !item.complete;
  //     }
  //     return item;
  //   });
  //   // console.log(todo);
  // }

  // handleDelete($event, todo) {
  //   $event.stopPropagation();
  //   this.todos = this.todos.filter((item) => item.id !== todo.id);
  // }
}
