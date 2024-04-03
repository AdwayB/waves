import { ChangeEvent, FC, FormEvent, useEffect, useState } from 'react';
import styles from './signup.module.scss';
import { InputField } from '../../../components';
import { UserData, UserDataInit } from '../dataModels';

const Signup: FC = () => {
  const [firstName, setFirstName] = useState<string>('');
  const [lastName, setLastName] = useState<string>('');
  const [passwordError, setPasswordError] = useState<boolean>(false);
  const [emailError, setEmailError] = useState<boolean>(false);
  const [formFields, setFormFields] = useState<UserData>(UserDataInit);

  useEffect(() => {
    if (firstName && lastName) {
      setFormFields((previousValue) => ({
        ...previousValue,
        userName: `${firstName.toLowerCase()}${lastName[0].toUpperCase()}${lastName.slice(1)}${Math.floor(Math.random() * 1000)}`,
        legalName: `${firstName[0].toUpperCase()}${firstName.slice(1)} ${lastName[0].toUpperCase()}${lastName.slice(1)}`,
      }));
    } else {
      console.warn('Form fields are not initialized');
      console.table(formFields);
    }
  }, [firstName, lastName]);

  const checkPasswordValidity = (password: string) => {
    if (
      password.length < 8 ||
      password.length > 120 ||
      password.search(/[a-z]/) < 0 ||
      password.search(/[A-Z]/) < 0 ||
      password.search(/[0-9]/) < 0
    ) {
      return false;
    }
    return true;
  };

  const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (!checkPasswordValidity(e.target.value)) {
      setPasswordError(true);
    } else {
      setPasswordError(false);
      setFormFields((previousValue) => ({
        ...previousValue,
        userPassword: e.target.value,
      }));
    }
  };

  const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (!/^[a-zA-Z0-9]+@gmail\.com$/.test(e.target.value)) {
      setEmailError(true);
    } else {
      setEmailError(false);
      setFormFields((previousValue) => ({
        ...previousValue,
        email: e.target.value,
      }));
    }
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    alert('test');
  };

  return (
    <>
      <div className={styles.signupContainer}>
        <div className={styles.leftContainer}>
          <span className={styles.logo}>waves</span>
          <pre className={styles.text}>
            Welcome to <span className={styles.logoText}>waves</span>!<br /> Create an account to get started.
          </pre>
        </div>
        <div className={styles.rightContainer}>
          <span className={styles.heading}>Sign Up</span>
          <form className={styles.signupForm} onSubmit={handleSubmit}>
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
                onChange={handleEmailChange}
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
                value={formFields.mobileNumber}
                onChange={(e) => setFormFields({ ...formFields, mobileNumber: e.target.value })}
                required
              />
            </div>
            <div className={styles.inputFieldContainer}>
              <InputField
                type="password"
                label="Enter Password"
                id="userPassword"
                value={formFields.userPassword!}
                onChange={handlePasswordChange}
                error={passwordError}
                helperText={
                  passwordError
                    ? 'Password must contain between 8 and 120 characters, with at least one uppercase character and one number.'
                    : ' '
                }
                required
              />
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export { Signup };
