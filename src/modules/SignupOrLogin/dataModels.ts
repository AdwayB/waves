import { User } from '../../helpers';

enum UserType {
  Admin = 'Admin',
  User = 'User',
}

interface UserData {
  UserId?: string;
  UserName?: string;
  Password?: string;
  LegalName?: string;
  Email: string;
  MobileNumber?: string;
  Country?: string;
  Type: string;
}

interface UserLoginRequest {
  email: string;
  password: string;
  type: string;
}

interface UserSignupLoginResponse {
  user: User;
  token: string;
}

const UserDataInit: UserData = {
  UserName: '',
  LegalName: '',
  Email: '',
  Password: '',
  MobileNumber: '',
  Type: UserType.User,
};

const UserLoginInit: UserLoginRequest = {
  email: '',
  password: '',
  type: UserType.User,
};

export { UserType, UserDataInit, UserLoginInit };
export type { UserData, UserLoginRequest, UserSignupLoginResponse };
