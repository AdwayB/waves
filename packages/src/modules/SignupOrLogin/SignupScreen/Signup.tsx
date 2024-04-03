import { ChangeEvent, FC, FormEvent, useEffect, useRef, useState } from 'react';
import styles from './signup.module.scss';
import { Button, InputField } from '../../../components';
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
    console.table(formFields);
    e.preventDefault();
    e.stopPropagation();
    if (passwordError || emailError) {
      return;
    }
    // add API action here
  };

  const form = useRef<HTMLFormElement>(null);

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
          <form className={styles.signupForm} id="signupForm" ref={form} onSubmit={handleSubmit}>
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
                value={formFields.mobileNumber}
                onChange={handleFieldChange}
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
              <Button
                label="Sign Up"
                buttonType="primary"
                type="submit"
                onClick={() => form.current?.submit()}
                disabled={passwordError || emailError}
              />
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export { Signup };
