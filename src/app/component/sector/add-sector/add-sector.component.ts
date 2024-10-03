import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import {MatIcon} from "@angular/material/icon";
import {MatMiniFabButton} from "@angular/material/button";
import {ToastrService} from "ngx-toastr";
import {SectorService} from "../../../service/sector.service";

@Component({
  selector: 'app-add-sector',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatIcon,
    MatMiniFabButton
  ],
  templateUrl: './add-sector.component.html',
  styleUrl: './add-sector.component.css'
})
export class AddSectorComponent implements OnInit{
  form: FormGroup = new FormGroup<any>({});
  constructor(
    public activeModal: NgbActiveModal,
    private formBuilder: FormBuilder,
    private toast: ToastrService,
    private sectorService: SectorService) {}

  ngOnInit(): void {
    this.buildForm();
  }

  close(): void {
    this.activeModal.close();
  }

  submit() {
    if(this.form.invalid)  this.toast.error("Please fill out all details.");

    this.sectorService.save(this.form.value.name).subscribe({
      next: (res: any) => {
        this.activeModal.close();
      }
    })
  }

  private buildForm() {
    this.form = this.formBuilder.group({
      name: [undefined, Validators.required]
    })
  }
}
