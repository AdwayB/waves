enum UserType {
  Admin = 'Admin',
  User = 'User',
}

interface UserData {
  userId?: string;
  userName: string;
  userPassword?: string;
  legalName: string;
  email: string;
  mobileNumber: string;
  countryCode?: string;
  type?: string;
}

interface UserLoginRequest {
  email: string;
  password: string;
  type: string;
}

interface UserSignupLoginResponse {
  userId: string;
  userName: string;
  type: string;
  token: string;
}

const UserDataInit: UserData = {
  userName: '',
  legalName: '',
  email: '',
  userPassword: '',
  mobileNumber: '',
  type: UserType.User,
};

const UserLoginInit: UserLoginRequest = {
  email: '',
  password: '',
  type: UserType.User,
};

export { UserType, UserDataInit, UserLoginInit };
export type { UserData, UserLoginRequest, UserSignupLoginResponse };
