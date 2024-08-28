import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit{

  form: FormGroup = new FormGroup({});
  constructor(
    private builder: FormBuilder
  ) {
  }
  ngOnInit(): void {
    this.buildForm();
  }

  buildForm() {
    this.form = this.builder.group({
      username: [undefined, Validators.required],
      password: [undefined, Validators.required]
    })
  }

  submit() {
    if (this.form.invalid) {
      alert("Please fill out form")
    } else {
      console.log("submitted data", this.form.value);

    }
  }

}
