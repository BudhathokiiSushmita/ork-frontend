import {Environment} from "../../environment/environment";

export const APIConstant = {
  USER_API : "/users",
  ROLE_API : `${Environment.baseUrl}/roles`,
  NAV_PERMISSION_API : `${Environment.baseUrl}/nav-permissions`,
}

export const ROLEConstant = {
  APPLICANT : 'APPLICANT'
}
