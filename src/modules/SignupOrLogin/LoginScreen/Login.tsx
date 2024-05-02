import { ChangeEvent, FC, FormEvent, useEffect, useRef, useState } from 'react';
import styles from './login.module.scss';
import { Alert, Button, Checkbox, InputField } from '../../../components';
import { UserLoginInit, UserLoginRequest, UserSignupLoginResponse, UserType } from '../dataModels';
import { useMutation } from 'react-query';
// import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { setCookie } from '../../../helpers';

const Login: FC = () => {
  const navigate = useNavigate();
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
    (formData: UserLoginRequest): Promise<UserSignupLoginResponse> => {
      console.table(formData);
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve({
            userId: '',
            userName: '',
            type: 'Admin',
            token: 'testCookie',
          });
        }, 4000);
      });
      // return axios.post(`${process.env.WAVES_SERVER_URL}/login`, formData);
    },
    {
      onSuccess: (data: UserSignupLoginResponse) => {
        setCookie('jwt', data.token);
        setCookie('type', data.type.replace('"', ''));
      },
      onError: (error) => {
        console.error('Signup failed', error);
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
    console.table(formFields);
    if (passwordError || emailError) {
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
          Please verify your entries and try again.
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
            <form className={styles.loginForm} id="loginForm" ref={form} onSubmit={handleSubmit}>
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
