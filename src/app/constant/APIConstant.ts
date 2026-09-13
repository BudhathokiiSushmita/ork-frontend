import {Environment} from "../../environment/environment";

export const APIConstant = {
  USER_API : "/users",
  ROLE_API : `${Environment.baseUrl}/roles`,
  NAV_PERMISSION_API : `${Environment.baseUrl}/nav-permissions`,
  SECTOR_API : `${Environment.baseUrl}/sector`,
  COMPANY_API: `${Environment.baseUrl}/company`,
  VACANCY_API: `${Environment.baseUrl}/vacancy`,
  GENERAL_API: `${Environment.baseUrl}/general`,
  APPLICATION_API: `${Environment.baseUrl}/application`
}

export const ROLEConstant = {
  ADMIN : 'ADMIN',
  APPLICANT : 'APPLICANT',
  DIRECTOR: 'DIRECTOR',
  HR: 'HR',
  RECRUITER: 'RECRUITER'
}

export const STATUSConstant: { [key: string]: string } = {
  DRAFT: 'Draft',
  SUBMITTED: 'Submitted',
  PREVIEW_BY_HR: 'Under HR Review',
  PREVIEW_BY_DIRECTOR: 'Under Director Review',
  PREVIEW_BY_RECRUITER: 'Under Recruiter Review',
  APPROVE: 'Approved'
};
