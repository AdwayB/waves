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

const UserDataInit: UserData = {
  userName: '',
  legalName: '',
  email: '',
  userPassword: '',
  mobileNumber: '',
};

export { UserData, UserDataInit };
