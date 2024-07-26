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
      <div className={styles.profileInfoContainer}>
        <div className={styles.inputFieldContainer}>
          <InputField
            type="text"
            label="First Name"
            id="firstName"
            value={userData.LegalName?.split(' ')[0] ?? ''}
            readOnly
          />
        </div>
        <div className={styles.inputFieldContainer}>
          <InputField
            type="text"
            label="Last Name"
            id="lastName"
            value={userData.LegalName?.split(' ').at(-1) ?? ''}
            readOnly
          />
        </div>
        <div className={styles.inputFieldContainer}>
          <InputField type="text" label="Username" id="Username" value={userData?.Username ?? ''} readOnly />
        </div>
        <div className={styles.inputFieldContainer}>
          <InputField type="text" label="GMail ID" id="Email" value={userData?.Email} readOnly />
        </div>
        <div className={styles.inputFieldContainer}>
          <InputField
            type="text"
            label="Phone Number"
            id="MobileNumber"
            value={userData?.MobileNumber ?? ''}
            readOnly
          />
        </div>
        <div className={styles.userTypeContainer}>
          <span className={styles.userTypeTitle}>Account Type:&nbsp;</span>
          <span className={styles.userTypeText}>{userData.Type}</span>
        </div>
      </div>
    </div>
  );
};

export { ViewProfile };
