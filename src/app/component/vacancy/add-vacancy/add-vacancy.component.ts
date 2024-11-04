import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import {ToastrService} from "ngx-toastr";
import {VacancyService} from "../../../service/vacancy.service";
import {MatIcon} from "@angular/material/icon";
import {MatMiniFabButton} from "@angular/material/button";

@Component({
  selector: 'app-add-vacancy',
  standalone: true,
  imports: [
    MatIcon,
    MatMiniFabButton,
    ReactiveFormsModule
  ],
  templateUrl: './add-vacancy.component.html',
  styleUrl: './add-vacancy.component.css'
})
export class AddVacancyComponent implements OnInit{
  form: FormGroup = new FormGroup<any>({});
  constructor(
    public activeModal: NgbActiveModal,
    private formBuilder: FormBuilder,
    private toast: ToastrService,
    private vacancyService: VacancyService) {}

  ngOnInit(): void {
    this.buildForm();
  }

  close(): void {
    this.activeModal.close();
  }

  submit() {
    if(this.form.invalid)  this.toast.error("Please fill out all details.");

    this.vacancyService.save(this.form.value.name).subscribe({
      next: (res: any) => {
        this.activeModal.close();
      }
    })
  }

  private buildForm() {
    this.form = this.formBuilder.group({
      title: [undefined, Validators.required],
      vacancyType: [undefined, Validators.required],
      positionNumber: [undefined, Validators.required],
      description: [undefined, Validators.required],
      qualification: [undefined, Validators.required],
      requirement: [undefined, Validators.required],
      startDate: [undefined, Validators.required],
      deadline: [undefined, Validators.required],
      salaryRange: [undefined, Validators.required],
      applicationProcedure: [undefined, Validators.required],
      documentRequirement: [undefined, Validators.required],
      isPaidPosition: [undefined, Validators.required],
    })
  }
}
