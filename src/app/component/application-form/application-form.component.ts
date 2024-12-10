import {Component, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {MatStepperModule} from "@angular/material/stepper";
import {MatInputModule} from "@angular/material/input";
import {CommonModule} from "@angular/common";
import {PersonalInfoComponent} from "./personal-info/personal-info.component";
import {QuestionnaireComponent} from "./questionnaire/questionnaire.component";
import {ApplicationDocumentComponent} from "./application-document/application-document.component";
import {ApplicationRequestModel} from "../../model/application-request.model";

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

  activeTemplate: TemplateRef<any> = this.template0;
  templateList: TemplateRef<any>[] = [];
  templateIndex: number = 0;

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


  }
}
