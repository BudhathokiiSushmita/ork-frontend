import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import { ToastrService} from "ngx-toastr";
import {UserService} from "../../service/user.service";
import {CompanyService} from "../../service/company.service";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {AddCompanyComponent} from "../company/add-company/add-company.component";
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
    private companyService: CompanyService,
    private modalService: NgbModal,
    private authService: AuthService
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
          // Not saving in localstorage to avoid accidental login when page is refreshed.
          // This is one-time use as when you refresh this is erased.
          this.authService.setToken(res.body.accessToken);
          this.authService.setUsername(res.body.username);

          // Checking whether Company exists for RECRUITER
          this.checkCompanyBasedOnRole(res.body.accessToken, res.body.username);
        }
      })
    }
  }

  checkCompanyBasedOnRole(token: any, username: any) {
    this.companyService.checkIfCompanyExistsByCurrentUser().subscribe({
      next: (res: any) => {
        if (res.body) {
          // this means user is not Recruiter
          this.markAsLoggedIn(token, username);
        } else {
          //needs to open modal to create company and only then reload the window
          const dialogRef = this.modalService.open(AddCompanyComponent,);
          dialogRef.result.then(
            (res: any) => {
              this.markAsLoggedIn(token, username);
            })
        }
      }
    })
  }

  markAsLoggedIn(token: any, username: any) {
    localStorage.setItem("token", token);
    localStorage.setItem("username", username);
    this.toast.success("Successfully logged in");
    setTimeout(() => {
      window.location.reload();
    }, 1000);
  }
}
