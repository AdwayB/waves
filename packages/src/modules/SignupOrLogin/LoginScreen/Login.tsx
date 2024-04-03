import { ChangeEvent, FC, FormEvent, useRef, useState } from 'react';
import styles from './login.module.scss';
import { Button, InputField } from '../../../components';
import { UserData, UserDataInit } from '../dataModels';

const Login: FC = () => {
  const [passwordError, setPasswordError] = useState<boolean>(false);
  const [emailError, setEmailError] = useState<boolean>(false);
  const [formFields, setFormFields] = useState<UserData>(UserDataInit);

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
    return !/^[a-zA-Z0-9]+@gmail\.com$/.test(email);
  };

  const handleFieldChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormFields((previousValue) => ({
      ...previousValue,
      [name]: value,
    }));
    if (name === 'email') {
      setEmailError(checkEmailValidity(value));
    } else if (name === 'userPassword') {
      setPasswordError(!checkPasswordValidity(value));
    } else {
      setPasswordError(false);
      setEmailError(false);
    }
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.table(formFields);
    if (passwordError || emailError) {
      return;
    }
    alert('test');
    // add API action here
  };

  const form = useRef<HTMLFormElement>(null);

  return (
    <>
      <div className={styles.loginContainer}>
        <div className={styles.leftContainer}>
          <span className={styles.logo}>waves</span>
          <pre className={styles.text}>
            Welcome to <span className={styles.logoText}>waves</span>!<br /> Log back in to pick up where you left off.
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
                id="userPassword"
                value={formFields.userPassword ?? ''}
                onChange={handleFieldChange}
                error={passwordError}
                helperText={
                  passwordError
                    ? 'Password must contain between 8 and 120 characters, with at least one uppercase character and one number.'
                    : ' '
                }
                required
              />
            </div>
            <div className={styles.buttonContainer}>
              <Button label="Log In" buttonType="primary" type="submit" onClick={() => form.current?.submit()} />
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export { Login };
