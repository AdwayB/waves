import { ChangeEvent, FC, FormEvent, useEffect, useRef, useState } from 'react';
import styles from './signup.module.scss';
import { Alert, Button, Checkbox, InputField } from '../../../components';
import { useMutation } from 'react-query';
import { useNavigate } from 'react-router-dom';
import { LoginResponse, UserData, UserDataInit, UserType } from '../../../helpers';
import { signupUser } from '../../../utils';
import { useDispatch } from 'react-redux';
import { setIsAuthenticated, setUser } from '../../../redux';
import { AxiosError } from 'axios';

const Signup: FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [alertMessage, setAlertMessage] = useState<string>('Please verify your entries and try again.');
  const [firstName, setFirstName] = useState<string>('');
  const [lastName, setLastName] = useState<string>('');
  const [emailError, setEmailError] = useState<boolean>(false);
  const [mobileNumberError, setMobileNumberError] = useState<boolean>(false);
  const [passwordError, setPasswordError] = useState<boolean>(false);
  const [recheckPasswordError, setRecheckPasswordError] = useState<boolean>(false);
  const [recheckPassword, setRecheckPassword] = useState<string>('');
  const [admin, setAdmin] = useState<boolean>(false);
  const [formSubmissionError, setFormSubmissionError] = useState<boolean>(false);
  const [formFields, setFormFields] = useState<UserData>(UserDataInit);

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
        UserName: getUserName(firstName, lastName),
        LegalName: `${firstName[0].toUpperCase()}${firstName.slice(1)} ${lastName[0].toUpperCase()}${lastName.slice(1)}`,
        Country: 'IND',
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
        type: UserType.Admin,
      }));
    } else {
      setAdmin(false);
      setFormFields((previousValue) => ({
        ...previousValue,
        type: UserType.User,
      }));
    }
  };

  const handleFieldChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (admin) {
      setFormFields((previousValue) => ({
        ...previousValue,
        [name]: value,
        type: UserType.Admin,
      }));
    } else {
      setFormFields((previousValue) => ({
        ...previousValue,
        [name]: value,
        type: UserType.User,
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

  const { mutate, isLoading, isError, isSuccess } = useMutation(
    async (formData: UserData): Promise<UserData> => {
      const user = await signupUser(formData);
      const userData = (user.data as LoginResponse).user;
      return userData;
    },
    {
      onSuccess: (userData) => {
        if (userData) {
          dispatch(setUser(userData));
          dispatch(setIsAuthenticated(true));
          navigate('/user');
        } else {
          throw new Error('User Data not found.');
        }
      },
      onError: (error) => {
        const response = (error as AxiosError).response;
        if (response?.status === 400) {
          setAlertMessage(response.data as string);
        } else if (response?.status !== 200) {
          setAlertMessage('Signup failed.');
        }
        console.error('Error during signup:', error);
        setFormSubmissionError(true);
      },
    },
  );

  useEffect(() => {
    if (isSuccess) {
      navigate('/user');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSuccess]);

  useEffect(() => {
    if (isError) {
      setFormSubmissionError(true);
    }
  }, [isError]);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (passwordError || recheckPasswordError || emailError || mobileNumberError) {
      setFormSubmissionError(true);
      return false;
    }
    try {
      mutate(formFields);
    } catch (err) {
      setFormSubmissionError(true);
      console.log('Error while submitting the form' + err);
    }
    return false;
  };

  const form = useRef<HTMLFormElement>(null);

  return (
    <>
      <div className={styles.pageContainer}>
        <Alert visible={formSubmissionError} onClose={() => setFormSubmissionError(false)} severity="error">
          {alertMessage}
        </Alert>
        <div className={styles.signupContainer}>
          <div className={styles.leftContainer}>
            <span className={styles.logo}>waves</span>
            <pre className={styles.text}>
              Welcome to <span className={styles.logoText}>waves</span>!<br /> Create an account to get started.
            </pre>
          </div>
          <div className={styles.rightContainer}>
            <span className={styles.heading}>Sign Up</span>
            <form
              className={styles.signupForm}
              id="signupForm"
              ref={form}
              onSubmit={handleSubmit}
              method="post"
              action="/api/auth/signup"
            >
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
              <Checkbox
                direction="column"
                items={[
                  {
                    label: 'I will potentially be creating my own events on this platform.',
                    onClick: () => handleUserTypeChange(true),
                  },
                ]}
                className={styles.checkbox}
              />
              <Button
                label="Sign Up"
                buttontype="primary"
                type="submit"
                onClick={() => console.log('Sign Up button clicked.')}
                disabled={passwordError || emailError}
                buttonloading={isLoading}
                className={styles.button}
              />
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export { Signup };
