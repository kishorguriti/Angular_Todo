import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { TodoService } from 'src/app/services/todo.service';
import * as moment from 'moment';
import { Router } from '@angular/router';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.sass'],
})
export class TodoComponent {
  id: any;
  now = new Date();

  constructor(
    private srv: TodoService,
    private router: Router,
    private ar: ActivatedRoute
  ) { }

  TodoForm = new FormGroup({
    title: new FormControl('', Validators.compose([Validators.required])),
    completed: new FormControl('', Validators.compose([Validators.required])),
    target: new FormControl('', Validators.compose([Validators.required])),
    createdAt: new FormControl(moment().format('DD-MM-YYYY HH:mm:SS')),
    updatedAt: new FormControl(moment().format('DD-MM-YYYY HH:mm:SS')),
  });

  ngOnInit() {
    this.ar.params.subscribe((params: any) => {
      if (params.id) {
        console.log(params.id)
        this.id = params.id;
        this.getSingelTodo();
      }
    });
  }

  onSubmit(event: any) {
    event.preventDefault();

    if (this.TodoForm.invalid) {
      return;
    }

    let object = {
      ...this.TodoForm.value,
      target: moment(this.TodoForm.value.target).format('YYYY-MM-DD'),
    };

    if (this.id) {
      return this.srv.update(this.TodoForm.value, this.id).subscribe({
        next: (res) => {
          console.log(res);
          this.router.navigateByUrl('/');
        },
        error: (err) => {
          console.log(err);
        },
      });
    }

    return this.srv.create(object).subscribe({
      next: (res) => {
        console.log(res);
        this.router.navigateByUrl('/');
      },

      error: (err) => {
        console.log(err);
      },
      complete: () => {
        console.log('i am complete');
      },
    });
  }

  getSingelTodo() {
    return this.srv.singleTodo(this.id).subscribe({
      next: (res) => {
        console.log(res);
        this.TodoForm.patchValue(res);
      },
      error: (err) => {
        console.log(err);
      },
      complete: () => {
        console.log('i am complete from get single product');
      },
    });
  }
}
