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
  APPLICANT : 'APPLICANT',
  DIRECTOR: 'DIRECTOR',
  HR: 'HR',
  RECRUITER: 'RECRUITER'
}
