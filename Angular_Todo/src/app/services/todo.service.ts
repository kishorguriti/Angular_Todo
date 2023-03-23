import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  constructor(private http: HttpClient) { }


  all() {
    return this.http.get('http://localhost:3001/todos')
  }

  create(payload: any) {
    return this.http.post('http://localhost:3001/todos', payload)
  }

  update(payload: any, id: any) {
    return this.http.put(`http://localhost:3001/todos/${id}`, payload)
  }

  singleTodo(id: any) {
    return this.http.get(`http://localhost:3001/todos/${id}`)
  }
  deleteTodo(id: any) {
    return this.http.delete(`http://localhost:3001/todos/${id}`)
  }

}
