import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule} from "@angular/forms";
import {RoleService} from "../../service/role.service";
import {CommonModule} from "@angular/common";
import {NgxSelectModule} from "ngx-select-ex";
import {RoleModel} from "../../model/role.model";
import {ROLEConstant} from "../../constant/APIConstant";
import {ToastrService} from "ngx-toastr";
import {UserService} from "../../service/user.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    ReactiveFormsModule, CommonModule, NgxSelectModule
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent implements OnInit{
  form: FormGroup = new FormGroup<any>({});
  constructor(
    private builder: FormBuilder,
    private toastr: ToastrService,
    private userService: UserService,
    private router: Router
  ) {
  }

  ngOnInit(): void {
    this.buildForm();
  }

  buildForm() {
    this.form = this.builder.group({
      roleName: ROLEConstant.APPLICANT,
      username: [undefined],
      password: [undefined],
      email: [undefined],
      contactNumber: [undefined]
    })
  }

  submitForm() {
    if(this.form.invalid) {
      this.toastr.error("Empty fields found");
      return;
    }

    this.userService.register(this.form.value).subscribe({
      next: (res: any) => {
        this.router.navigate(["/login"]);
      }
    })

  }

}
