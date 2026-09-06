export class CompanyModel {
  id: number | null = null;
  name: string = '';
  address: string = '';
  createdBy: UserResponseModel | null = null;
  created: Date | null = null;
}

export class UserResponseModel {
  username: string = '';
}
