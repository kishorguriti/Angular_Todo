import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.sass']
})
export class FormComponent {

  loginForm = new FormGroup({
    firstname: new FormControl("", Validators.compose([Validators.required, Validators.minLength(3), Validators.maxLength(9)])),
    lastname: new FormControl("", Validators.compose([Validators.required, Validators.minLength(3), Validators.maxLength(9)])),
    password: new FormControl("", Validators.compose([Validators.required, Validators.minLength(8)]))
  })
  onSubmit(event: any) {
    event.preventDefault();
  }



}
