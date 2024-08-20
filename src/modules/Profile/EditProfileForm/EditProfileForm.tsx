import { ChangeEvent, FC, FormEvent, useEffect, useRef, useState } from 'react';
import styles from './editProfileForm.module.scss';
import { Alert, Button, Checkbox, InputField, Switch } from '../../../components';
import { UserData, UserType } from '../../../helpers';
import { getUserByID, updateUserInfo } from '../../../utils';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setUser } from '../../../redux';

interface EditProfileFormProps {
  userData: UserData;
}

const EditProfileForm: FC<EditProfileFormProps> = (props) => {
  const { userData } = props;
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [firstName, setFirstName] = useState<string>(userData.legalName?.split(' ')[0] ?? '');
  const [lastName, setLastName] = useState<string>(userData.legalName?.split(' ')[1] ?? '');
  const [emailError, setEmailError] = useState<boolean>(false);
  const [mobileNumberError, setMobileNumberError] = useState<boolean>(false);
  const [passwordEdit, setPasswordEdit] = useState<boolean>(false);
  const [passwordError, setPasswordError] = useState<boolean>(false);
  const [recheckPasswordError, setRecheckPasswordError] = useState<boolean>(false);
  const [recheckPassword, setRecheckPassword] = useState<string>('');
  const [admin, setAdmin] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const [formFields, setFormFields] = useState<UserData>(userData);

  const getUserName = (firstName: string, lastName: string) => {
    var userName = `${firstName.toLowerCase()}${lastName[0].toUpperCase()}${lastName.slice(1)}${Math.floor(Math.random() * 1000)}`;
    while (userName.length > 20) {
      userName = userName.slice(0, -1);
    }
    return userName;
  };

  useEffect(() => {
    if (firstName && lastName) {
      setFormFields((previousValue) => ({
        ...previousValue,
        Username: getUserName(firstName, lastName),
        LegalName: `${firstName[0].toUpperCase()}${firstName.slice(1)} ${lastName[0].toUpperCase()}${lastName.slice(1)}`,
      }));
    }
  }, [firstName, lastName]);

  const checkPasswordValidity = (password: string) => {
    return password.length < 8 ||
      password.length > 120 ||
      password.search(/[a-z]/) < 0 ||
      password.search(/[A-Z]/) < 0 ||
      password.search(/[0-9]/) < 0
      ? false
      : true;
  };

  const checkEmailValidity = (email: string) => {
    return /^[a-zA-Z0-9]+@gmail\.com$/.test(email);
  };

  const checkMobileNumberValidity = (number: string) => {
    return /^\+[1-9]\d{8,16}$/.test(number);
  };

  const handleUserTypeChange = (admin: boolean = false) => {
    if (admin) {
      setAdmin(true);
      setFormFields((previousValue) => ({
        ...previousValue,
        Type: UserType.Admin,
      }));
    } else {
      setAdmin(false);
      setFormFields((previousValue) => ({
        ...previousValue,
        Type: UserType.User,
      }));
    }
  };

  const handleFieldChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (admin) {
      setFormFields((previousValue) => ({
        ...previousValue,
        [name]: value,
        Type: UserType.Admin,
      }));
    } else {
      setFormFields((previousValue) => ({
        ...previousValue,
        [name]: value,
        Type: UserType.User,
      }));
    }
    if (name === 'Email') {
      setEmailError(!checkEmailValidity(value));
    } else if (name === 'Password') {
      setPasswordError(!checkPasswordValidity(value));
    } else if (name === 'MobileNumber') {
      setMobileNumberError(!checkMobileNumberValidity(value));
    } else {
      setPasswordError(false);
      setEmailError(false);
      setMobileNumberError(false);
    }
  };

  const handleRecheckPasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    setRecheckPassword(e.target.value);
    if (e.target.value !== formFields.password) {
      setRecheckPasswordError(true);
    } else {
      setRecheckPasswordError(false);
    }
  };

  const sendUpdateData = async (data: UserData) => {
    setIsLoading(true);
    const responseStatus = await updateUserInfo(data);
    if (responseStatus.status !== 200) {
      setIsError(true);
      setIsLoading(false);
      return;
    }
    const newUserData = await getUserByID(data.userId ?? '12');
    dispatch(setUser(newUserData.data as UserData));
    setIsLoading(false);
    setIsSuccess(true);
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (passwordError || recheckPasswordError || emailError || mobileNumberError) {
      return false;
    }
    try {
      sendUpdateData(formFields);
    } catch (err) {
      setIsError(true);
      console.log('Error while submitting the form' + err);
    }
    return false;
  };

  const handleSuccessAlertClose = () => {
    setIsSuccess(false);
    navigate('/user');
  };

  const form = useRef<HTMLFormElement>(null);

  return (
    <>
      <Alert visible={isError} severity="error" onClose={() => setIsError(false)}>
        An error occurred while submitting the form. Please refresh and try again.
      </Alert>
      <Alert visible={isSuccess} severity="success" onClose={handleSuccessAlertClose}>
        Profile updated successfully!
      </Alert>
      <div className={styles.editProfileContainer}>
        <div className={styles.editFormHeading}>Edit Profile</div>
        <form className={styles.editForm} id="editForm" ref={form} onSubmit={handleSubmit}>
          <div className={styles.infoFields}>
            <div className={styles.inputFieldContainer}>
              <InputField
                type="text"
                label="Enter First Name"
                id="firstName"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                required
              />
            </div>
            <div className={styles.inputFieldContainer}>
              <InputField
                type="text"
                label="Enter Last Name"
                id="lastName"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                required
              />
            </div>
            <div className={styles.inputFieldContainer}>
              <InputField
                type="text"
                label="Enter GMail ID"
                id="email"
                value={formFields.email}
                onChange={handleFieldChange}
                error={emailError}
                helperText={emailError ? 'Email must be a valid GMail ID. Ex: foo.bar@example.com' : ' '}
                required
              />
            </div>
            <div className={styles.inputFieldContainer}>
              <InputField
                type="text"
                label="Enter Phone Number"
                id="mobileNumber"
                value={formFields.mobileNumber ?? ''}
                onChange={handleFieldChange}
                required
                error={mobileNumberError}
                helperText={
                  mobileNumberError
                    ? 'The mobile number must begin with a dial code followed by a valid mobile number. Ex: +919876543210'
                    : ' '
                }
              />
            </div>
          </div>
          <Switch label="Edit Password" checked={passwordEdit} onChange={() => setPasswordEdit(!passwordEdit)} />
          {passwordEdit && (
            <div className={styles.passwordFields}>
              <div className={styles.inputFieldContainer}>
                <InputField
                  type="password"
                  label="Enter Password"
                  id="password"
                  value={formFields.password ?? ''}
                  onChange={handleFieldChange}
                  error={passwordError}
                  helperText={
                    passwordError
                      ? 'Password must contain between 8 and 120 characters, with at least one uppercase character, one lowercase character and one number.'
                      : ' '
                  }
                  required
                />
              </div>
              <div className={styles.inputFieldContainer}>
                <InputField
                  type="password"
                  label="Re-Enter Password"
                  id=""
                  value={recheckPassword}
                  onChange={handleRecheckPasswordChange}
                  error={recheckPasswordError}
                  helperText={recheckPasswordError ? 'Passwords do not match.' : ' '}
                  required
                />
              </div>
            </div>
          )}
          <Checkbox
            groupLabel="Modify Account Type:"
            direction="row"
            items={[
              {
                label: UserType.Admin,
                checked: formFields.type === UserType.Admin,
                onClick: () => handleUserTypeChange(true),
              },
              {
                label: UserType.User,
                checked: formFields.type === UserType.User,
                onClick: () => handleUserTypeChange(false),
              },
            ]}
            className={styles.checkbox}
          />
          <Button
            label="Save Changes"
            buttontype="primary"
            type="submit"
            onClick={() => console.log('Profile Details Updated.')}
            disabled={passwordError || emailError}
            className={styles.button}
            buttonloading={isLoading}
          />
        </form>
      </div>
    </>
  );
};

export { EditProfileForm };
