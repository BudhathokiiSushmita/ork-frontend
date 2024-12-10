import {BaseEntityModel} from "./base-entity.model";

export class ApplicationRequestModel extends BaseEntityModel{

  //personal data
  firstName: String | null = null;
  lastName: String | null = null;
  address: String | null = null;
  country: String | null = null;
  workExperienceList: Array<WorkExperienceModel> = new Array<WorkExperienceModel>();
  educationQualificationList: Array<EducationQualificationModel> = new Array<EducationQualificationModel>();

  //questionnaire
  professionChoice: String | null = null;
  companyChoice: String | null = null;
  uniqueQualities: String | null = null;

  vacancyId: Number | null = null;
}

export class WorkExperienceModel extends BaseEntityModel{
  companyName: String | null = null;
  designation: String | null = null;
  responsibilities: String | null = null;
  startDate: Date | null = null;
  endDate: Date | null = null;
}

export class EducationQualificationModel extends BaseEntityModel{
  institution: String | null = null;
  courseName: String | null = null;
  gradeOrPercentage: String | null = null;
  startDate: Date | null = null;
  endDate: Date | null = null;
}
