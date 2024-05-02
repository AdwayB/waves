import { FC, useEffect, useState } from 'react';
import styles from './viewProfile.module.scss';
import { InputField } from '../../../components';
import { UserType } from '../../SignupOrLogin/dataModels';
import { UserData } from '../../../helpers';

const ViewProfile: FC = () => {
  const [firstLoad, setFirstLoad] = useState<boolean>(true);
  const [formFields, setFormFields] = useState<UserData>({
    userName: '',
    legalName: '',
    email: '',
    userPassword: '',
    mobileNumber: '',
    type: UserType.User,
  });

  useEffect(() => {
    if (firstLoad) {
      setFirstLoad(false);
      setFormFields({
        userName: 'Test User',
        legalName: 'Test User',
        email: 'testUser@gmail',
        userPassword: 'Test@123',
        mobileNumber: '1234567890',
        type: UserType.User,
      });
    }
  }, [firstLoad]);

  return (
    <div className={styles.viewProfileContainer}>
      <div className={styles.inputFieldContainer}>
        <InputField type="text" label="Username" id="userName" value={formFields.userName} />
      </div>
      <div className={styles.inputFieldContainer}>
        <InputField type="text" label="First Name" id="firstName" value={formFields.legalName.split(' ')[0]} />
      </div>
      <div className={styles.inputFieldContainer}>
        <InputField type="text" label="Enter Last Name" id="lastName" value={formFields.legalName.split(' ')[0]} />
      </div>
      <div className={styles.inputFieldContainer}>
        <InputField type="text" label="Enter GMail ID" id="email" value={formFields.email} />
      </div>
      <div className={styles.inputFieldContainer}>
        <InputField type="text" label="Enter Phone Number" id="mobileNumber" value={formFields.mobileNumber} />
      </div>
      <div className={styles.userTypeContainer}>{formFields.type}</div>
    </div>
  );
};

export { ViewProfile };
