import {Component, OnInit} from '@angular/core';
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {ToastrService} from "ngx-toastr";
import {CompanyService} from "../../../service/company.service";
import {MatIcon} from "@angular/material/icon";
import {MatMiniFabButton} from "@angular/material/button";

@Component({
  selector: 'app-add-company',
  standalone: true,
  imports: [
    MatIcon,
    MatMiniFabButton,
    ReactiveFormsModule
  ],
  templateUrl: './add-company.component.html',
  styleUrl: './add-company.component.css'
})
export class AddCompanyComponent implements OnInit{
  form: FormGroup = new FormGroup<any>({});

  constructor(
    public activeModal: NgbActiveModal,
                 private formBuilder: FormBuilder,
                 private toast: ToastrService,
                 private companyService: CompanyService) {

  }

  ngOnInit(): void {
    this.buildForm();
  }

  close(): void {
    //need to logout for this
    localStorage.removeItem("token");
    this.activeModal.close();
  }

  private buildForm() {
    this.form = this.formBuilder.group({
      name: [undefined, Validators.required],
      address: [undefined, Validators.required]
    })
  }

  submit() {
    if (this.form.invalid) this.toast.error("Please fill out all details.");

    this.companyService.save(this.form.value).subscribe({
      next: (res: any) => {
        this.activeModal.close();
      }
    })
  }
}
