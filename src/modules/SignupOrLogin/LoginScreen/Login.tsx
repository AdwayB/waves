import { ChangeEvent, FC, FormEvent, useEffect, useRef, useState } from 'react';
import styles from './login.module.scss';
import { Alert, Button, Checkbox, InputField } from '../../../components';
import { UserLoginInit, UserLoginRequest, UserType } from '../dataModels';
import { useMutation } from 'react-query';
import { useNavigate } from 'react-router-dom';
import { getUserCookie } from '../../../helpers';
import { setIsAuthenticated, setUser } from '../../../redux';
import { useDispatch } from 'react-redux';
import { loginUser } from '../../../utils';
import { AxiosError } from 'axios';

const Login: FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [alertMessage, setAlertMessage] = useState<string>('Please verify your entries and try again.');
  const [passwordError, setPasswordError] = useState<boolean>(false);
  const [emailError, setEmailError] = useState<boolean>(false);
  const [admin, setAdmin] = useState<boolean>(false);
  const [formSubmissionError, setFormSubmissionError] = useState<boolean>(false);
  const [formFields, setFormFields] = useState<UserLoginRequest>(UserLoginInit);

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
    if (name === 'email') {
      setEmailError(!checkEmailValidity(value));
    } else if (name === 'password') {
      setPasswordError(!checkPasswordValidity(value));
    } else {
      setPasswordError(false);
      setEmailError(false);
    }
  };

  const { mutate, isLoading, isError, isSuccess } = useMutation(
    async (formData: UserLoginRequest): Promise<void> => {
      await loginUser(formData);
    },
    {
      onSuccess: () => {
        const user = getUserCookie();
        if (user) {
          dispatch(setUser(user));
          dispatch(setIsAuthenticated(true));
          navigate('/user');
        } else {
          throw new Error('User Data not found.');
        }
      },
      onError: (error) => {
        const response = (error as AxiosError).response;
        if (response?.status === 404) {
          setAlertMessage('User does not exist. Please Sign Up.');
        } else if (response?.status === 401) {
          setAlertMessage('Incorrect password. Please try again.');
        } else if (response?.status !== 200) {
          throw new Error('Login failed.');
        }
        console.error('Error during login:', error);
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
    if (passwordError || emailError) {
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
      <div className={styles.loginWrapper}>
        <Alert visible={formSubmissionError} severity="error" onClose={() => setFormSubmissionError(false)}>
          {alertMessage}
        </Alert>
        <div className={styles.loginContainer}>
          <div className={styles.leftContainer}>
            <span className={styles.logo}>waves</span>
            <pre className={styles.text}>
              Welcome to <span className={styles.logoText}>waves</span>!<br /> Log back in to pick up where you left
              off.
            </pre>
          </div>
          <div className={styles.rightContainer}>
            <span className={styles.heading}>Log In</span>
            <form
              className={styles.loginForm}
              id="loginForm"
              ref={form}
              onSubmit={handleSubmit}
              method="post"
              action="/api/auth/login"
            >
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
              <Checkbox
                direction="column"
                items={[
                  {
                    label: 'I have or intend to create my own events on this platform.',
                    onClick: () => handleUserTypeChange(true),
                  },
                ]}
                className={styles.checkbox}
              />
              <Button
                label="Log In"
                buttontype="primary"
                type="submit"
                onClick={() => console.log('Log In button clicked.')}
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

export { Login };
