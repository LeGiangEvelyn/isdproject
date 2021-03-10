import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
@Injectable({
  providedIn: 'root',
})
export default class TodoHttpService {
  constructor(private http: HttpClient) {}

  getTodos() {
    return this.http.get('https://jsonplaceholder.typicode.com/posts');
  }

  getTodo(id) {
    return this.http.get('https://jsonplaceholder.typicode.com/posts/' + id);
  }
}
