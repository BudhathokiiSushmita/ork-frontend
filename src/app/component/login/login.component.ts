import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import { ToastrService} from "ngx-toastr";
import {UserService} from "../../service/user.service";
import {ActivatedRoute, Router} from "@angular/router";
import {AuthService} from "../../service/auth.service";

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
    private toast: ToastrService,
    private userService: UserService,
    private route: Router,
  ) {
  }
  ngOnInit(): void {
    this.buildForm();
  }

  buildForm() {
    this.form = this.builder.group({
      username: ["admin", Validators.required],
      password: ["Admin@123456", Validators.required]
    })
  }

  submit() {
    if (this.form.invalid) {
      this.toast.error("Please fill out all details.")
    } else {
      this.userService.authenticate(this.form.value).subscribe({
        next: (res: any) => {
          localStorage.setItem("token",res.body.accessToken );
          // this.authService.setTokenDetail(res.body.token, res.body.accessToken);
          window.location.reload();
        }
      })
    }
  }
}
