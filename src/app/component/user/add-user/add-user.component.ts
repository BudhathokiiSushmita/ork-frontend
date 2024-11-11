import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import { ToastrService } from "ngx-toastr";
import { UserService } from "../../../service/user.service";
import { RoleService } from "../../../service/role.service";
import { MatIcon } from "@angular/material/icon";
import { MatMiniFabButton } from "@angular/material/button";
import { NgForOf } from "@angular/common";

@Component({
  selector: 'app-add-user',
  standalone: true,
  imports: [
    MatIcon,
    MatMiniFabButton,
    ReactiveFormsModule,
    NgForOf,
  ],
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css'] // Fixed property name
})
export class AddUserComponent implements OnInit {
  form: FormGroup;
  roles: Array<any> = [];

  constructor(
    public activeModal: NgbActiveModal,
    private formBuilder: FormBuilder,
    private toast: ToastrService,
    private userService: UserService,
    private roleService: RoleService
  ) {
    this.form = this.buildForm(); // Initialize form
  }

  ngOnInit(): void {
    this.getAllRole();
  }

  private buildForm(): FormGroup {
    return this.formBuilder.group({
      username: [undefined, Validators.required],
      role: [undefined, Validators.required],
      emailAddress: [undefined, [Validators.required, Validators.email]], // Added email validation
      contactNumber: [undefined, Validators.required],
    });
  }

  getAllRole() {
    this.roleService.getAllRoles().subscribe({
      next: (res: any) => {
        this.roles = res.body || []; // Fallback to empty array if body is undefined
        if (this.roles.length > 0) {
          this.form.patchValue({ role: this.roles[1] }); // Set default role to the first one
        }
      },
      error: () => {
        this.toast.error("Failed to load roles.");
      }
    });
  }

  submit() {
    if (this.form.invalid) {
      this.toast.error("Please fill out all details.");
      return;
    }

    const userData = {
      ...this.form.value,
    };

    this.userService.save(userData).subscribe({
      next: () => {
        this.toast.success("User added successfully.");
        this.activeModal.close();
      },
      error: () => {
        this.toast.error("Failed to add user.");
      }
    });
  }

  close(): void {
    this.activeModal.dismiss();
  }
}
