import {Component, OnInit} from '@angular/core';
import {CommonModule} from "@angular/common";
import {FormArray, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule} from "@angular/forms";
import {CKEditorModule} from "@ckeditor/ckeditor5-angular";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

@Component({
  selector: 'app-personal-info',
  standalone: true,
  imports: [CommonModule,
    FormsModule,
    ReactiveFormsModule,
    CKEditorModule],
  templateUrl: './personal-info.component.html',
  styleUrl: './personal-info.component.css'
})
export class PersonalInfoComponent implements OnInit {
  form: FormGroup = new FormGroup<any>({});
  public Editor = ClassicEditor;

  constructor(
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.buildForm();
  }

  buildForm() {
    this.form = this.formBuilder.group({
      firstName: [undefined],
      lastName: [undefined],
      address: [undefined],
      country: [undefined],
      workExperience: this.formBuilder.array([
        this.workExperienceFormGroup()
      ]),
      educationQualification: this.formBuilder.array([
        this.eduForm()
      ]),
    })
  }

  workExperienceFormGroup() {
    const control = this.formBuilder.group({
      companyName: [undefined],
      startDate: [undefined],
      endDate: [undefined],
      designation: [undefined],
      responsibilities: [undefined]
    });

    return control;
  }

  get workExperience() {
    return this.form.controls["workExperience"] as FormArray;
  }

  addMoreWorkExp() {
    this.workExperience.push(this.workExperienceFormGroup());
  }

  removeWorkExp(index: any) {
    this.workExperience.removeAt(index);
  }

  private eduForm() {
    return this.formBuilder.group({
      institution: [undefined],
      startDate: [undefined],
      endDate: [undefined],
      courseName: [undefined],
      gradeOrPercentage: [undefined]
    });
  }

  get educationQualification() {
    return this.form.controls["educationQualification"] as FormArray;
  }

  addMoreEducationQual() {
    this.educationQualification.push(this.eduForm());
  }

  removeEducationQual(index: any) {
    this.educationQualification.removeAt(index);
  }

}
