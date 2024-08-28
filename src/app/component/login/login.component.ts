import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import { ToastrService} from "ngx-toastr";

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
    private builder: FormBuilder,
    private toast: ToastrService
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
      this.toast.error("Please fill out all details.")
    } else {
      console.log("submitted data", this.form.value);
      this.toast.success("Submitted successfully", 'Success')
    }
  }
}
