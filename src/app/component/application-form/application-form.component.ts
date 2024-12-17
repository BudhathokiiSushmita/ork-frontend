import {Component, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {MatStepperModule} from "@angular/material/stepper";
import {MatInputModule} from "@angular/material/input";
import {CommonModule} from "@angular/common";
import {PersonalInfoComponent} from "./personal-info/personal-info.component";
import {QuestionnaireComponent} from "./questionnaire/questionnaire.component";
import {ApplicationDocumentComponent} from "./application-document/application-document.component";
import {ApplicationRequestModel} from "../../model/application-request.model";
import {ActivatedRoute} from "@angular/router";
import {ApplicationService} from "../../service/application.service";

@Component({
  selector: 'app-application-form',
  standalone: true,
  imports: [MatStepperModule,
    MatInputModule,
    CommonModule
    , PersonalInfoComponent, QuestionnaireComponent, ApplicationDocumentComponent],
  templateUrl: './application-form.component.html',
  styleUrl: './application-form.component.css'
})
export class ApplicationFormComponent implements OnInit {

  applicationSteps = ["Personal Information", "QNA", "Documents"];

  @ViewChild('template0', {static: true}) template0!: TemplateRef<any>;
  @ViewChild('template1', {static: true}) template1!: TemplateRef<any>;
  @ViewChild('template2', {static: true}) template2!: TemplateRef<any>;

  @ViewChild('personalInfo') personalInfo!: PersonalInfoComponent;
  @ViewChild('questionnaire') questionnaire!: QuestionnaireComponent;
  @ViewChild('doc') doc!: ApplicationDocumentComponent;

  activeTemplate: TemplateRef<any> = this.template0;
  templateList: TemplateRef<any>[] = [];
  templateIndex: number = 0;

  personalInfoData: any | undefined;
  questionnaireData: any | undefined;
  docData: any | undefined;

  constructor(
    private activatedRoute: ActivatedRoute,
    private applicationService: ApplicationService
  ) {
  }

  ngOnInit(): void {
    this.templateList = [
      this.template0,
      this.template1,
      this.template2
    ]
    this.activeTemplate = this.templateList[0];

  }

  chooseTemplate(isAddition: boolean) {
    this.templateIndex = isAddition ? this.templateIndex + 1 : this.templateIndex - 1;
    this.activeTemplate = this.templateList[this.templateIndex];
  }

  submitApplication() {
    const applicationRequest = new ApplicationRequestModel();

    //personal info
    applicationRequest.firstName = this.personalInfoData.value.firstName;
    applicationRequest.lastName = this.personalInfoData.value.lastName;
    applicationRequest.address = this.personalInfoData.value.address;
    applicationRequest.country = this.personalInfoData.value.country;
    applicationRequest.workExperienceList = this.personalInfoData.value.workExperience;
    applicationRequest.educationQualificationList = this.personalInfoData.value.educationQualification;

    //questionnaire
    applicationRequest.professionChoice = this.questionnaireData.value.professionChoice;
    applicationRequest.companyChoice = this.questionnaireData.value.companyChoice;
    applicationRequest.uniqueQualities = this.questionnaireData.value.uniqueQualities;

    //submit
    const vacancyId = this.activatedRoute.snapshot.params['id'];
    applicationRequest.vacancyId = vacancyId;

    this.applicationService.save(applicationRequest).subscribe({
      next : (res: any) => {
        console.log("saved", res)
      },
      error : (err: any) => {
        console.log("error", err)
      }
    })
  }

  ngAfterViewChecked(): void {
    if (this.personalInfo) {
      this.personalInfoData = this.personalInfo.form;
    }
    if (this.questionnaire) {
      this.questionnaireData = this.questionnaire.form;
    }
    // if (this.doc) {
    //   this.docData = this.doc.form;
    // }
  }
}
