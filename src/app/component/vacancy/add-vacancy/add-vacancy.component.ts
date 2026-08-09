import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import {ToastrService} from "ngx-toastr";
import {VacancyService} from "../../../service/vacancy.service";
import {MatIcon} from "@angular/material/icon";
import {MatMiniFabButton} from "@angular/material/button";
import {CKEditorModule} from "@ckeditor/ckeditor5-angular";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import {GeneralService} from "../../../service/general.service";
import {NgForOf} from "@angular/common";
import {EnumPipe} from "../../../pipe/enum.pipe";
import {SectorService} from "../../../service/sector.service";
import {EnumValuePipe} from "../../../pipe/enumValue.pipe";

@Component({
  selector: 'app-add-vacancy',
  standalone: true,
  imports: [
    MatIcon,
    MatMiniFabButton,
    ReactiveFormsModule,
    CKEditorModule,
    NgForOf,
    EnumPipe,
    EnumValuePipe
  ],
  templateUrl: './add-vacancy.component.html',
  styleUrl: './add-vacancy.component.css'
})
export class AddVacancyComponent implements OnInit{
  public Editor = ClassicEditor;
  form: FormGroup = new FormGroup<any>({});
  vacancyList: Array<any> = new Array<any>();
  sectorList: Array<any> = new Array<any>();
  booleanList: Array<any> = new Array<any>();
  constructor(
    public activeModal: NgbActiveModal,
    private formBuilder: FormBuilder,
    private toast: ToastrService,
    private vacancyService: VacancyService,
    private generalService: GeneralService,
    private sectorService: SectorService) {}

  ngOnInit(): void {
    this.buildForm();
    this.getSectors();
    this.getVacancies();
    this.getBooleans();
  }

  close(): void {
    this.activeModal.close();
  }

  submit() {
    if(this.form.invalid)  this.toast.error("Please fill out all details.");

    const formData = this.form.getRawValue();
    formData.sector = this.sectorList.find(f => f.id == formData.sector);

    this.vacancyService.save(this.form.value).subscribe({
      next: (res: any) => {
        this.activeModal.close();
      }
    })
  }

  private buildForm() {
    this.form = this.formBuilder.group({
      sector: [undefined, Validators.required],
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


    // cant do [disabled] in html, because this is reactive form and [disabled] is template form syntax
    this.form.get('isPaidPosition')?.valueChanges.subscribe((value) => {
      const salaryRangeControl = this.form.get('salaryRange');
      if (value == this.booleanList[0]) {
        salaryRangeControl?.enable();
      } else {
        salaryRangeControl?.disable();
        salaryRangeControl?.setValue('', { emitEvent : false } );
      }
    })
  }

  private getVacancies() {
    this.generalService.getVacancies().subscribe({
      next: (res: any) => {
        this.vacancyList = res.body;
      }
    })
  }

  private getBooleans() {
    this.generalService.getBooleans().subscribe({
      next: (res: any) => {
        this.booleanList = res.body;
      }
    })
  }

  private getSectors() {
    this.sectorService.getAll(false).subscribe({
      next: (res: any) => {
        this.sectorList = res.body;
      }
    })
  }
}
