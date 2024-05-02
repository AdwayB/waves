import { FC } from 'react';
import styles from './viewProfile.module.scss';
import { InputField } from '../../../components';
import { UserData } from '../../../helpers';

interface ViewProfileProps {
  userData: UserData;
}

const ViewProfile: FC<ViewProfileProps> = (props) => {
  const { userData } = props;

  return (
    <div className={styles.viewProfileContainer}>
      <span className={styles.heading}>View Profile</span>
      <div className={styles.inputFieldContainer}>
        <InputField type="text" label="Username" id="userName" value={userData.userName} readOnly />
      </div>
      <div className={styles.inputFieldContainer}>
        <InputField type="text" label="First Name" id="firstName" value={userData.legalName.split(' ')[0]} readOnly />
      </div>
      <div className={styles.inputFieldContainer}>
        <InputField
          type="text"
          label="Last Name"
          id="lastName"
          value={userData.legalName.split(' ').at(-1)!}
          readOnly
        />
      </div>
      <div className={styles.inputFieldContainer}>
        <InputField type="text" label="GMail ID" id="email" value={userData.email} readOnly />
      </div>
      <div className={styles.inputFieldContainer}>
        <InputField type="text" label="Phone Number" id="mobileNumber" value={userData.mobileNumber} readOnly />
      </div>
      <div className={styles.userTypeContainer}>
        <span className={styles.userTypeTitle}>Account Type:&nbsp;</span>
        <span className={styles.userTypeText}>{userData.type}</span>
      </div>
    </div>
  );
};

export { ViewProfile };
