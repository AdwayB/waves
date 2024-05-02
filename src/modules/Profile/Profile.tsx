import { FC, Suspense, lazy, useEffect, useState } from 'react';
import styles from './profile.module.scss';
import ProfilePlaceholder from '../../assets/profile_placeholder.svg';
import ModeEditOutlineIcon from '@mui/icons-material/ModeEditOutline';
import DeleteIcon from '@mui/icons-material/Delete';
import { Button, Loading } from '../../components';
import { UserData, UserTestData } from '../../helpers';

const EditProfileForm = lazy(() =>
  import('./EditProfileForm/EditProfileForm').then((module) => ({ default: module.EditProfileForm })),
);

const ViewProfile = lazy(() => import('./ViewProfile/ViewProfile').then((module) => ({ default: module.ViewProfile })));

const Profile: FC = () => {
  document.title = 'My Profile - Waves';
  const UserData = UserTestData[0];
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [profileData, setProfileData] = useState<UserData>({
    userName: '',
    legalName: '',
    email: '',
    userPassword: '',
    mobileNumber: '',
    type: '',
  });

  useEffect(() => {
    setProfileData({
      userName: UserData.Username,
      legalName: UserData.LegalName,
      email: UserData.Email,
      userPassword: UserData.Password,
      mobileNumber: UserData.MobileNumber,
      type: UserData.Type,
    });
  }, [UserData]);

  const handleEditPhotoClick = () => {
    console.log('Edit photo clicked');
  };

  const handleDeletePhotoClick = () => {
    console.log('Delete photo clicked');
  };

  const handleProfileEditClick = () => {
    setIsEdit(true);
  };

  const handleEditFormSubmit = (data: UserData) => {
    console.table(data);
    setProfileData(data);
    setIsEdit(false);
  };

  const getFormComponent = () => {
    return isEdit ? (
      <EditProfileForm userData={profileData} onSubmit={handleEditFormSubmit} />
    ) : (
      <ViewProfile userData={profileData} />
    );
  };

  return (
    <div className={styles.profileContainer}>
      <div className={styles.leftContainer}>
        <div className={styles.profileImageText}>Profile Photo</div>
        <div className={styles.profileImageContainer}>
          <div className={styles.profileImage}>
            <img src={ProfilePlaceholder} alt="Profile Placeholder" className={styles.profilePlaceholder} />
          </div>
        </div>
        <div className={styles.changeDeleteButtons}>
          <Button
            buttontype="secondary"
            label={<ModeEditOutlineIcon />}
            onClick={handleEditPhotoClick}
            className={styles.changeButton}
          />
          <Button label={<DeleteIcon />} onClick={handleDeletePhotoClick} className={styles.deleteButton} />
        </div>
      </div>
      <div className={styles.rightContainer}>
        <div className={styles.profileInfoContainer}>
          <Suspense fallback={<Loading />}>{getFormComponent()}</Suspense>
        </div>
        {!isEdit && (
          <Button label="Edit Profile" onClick={handleProfileEditClick} className={styles.editProfileButton} />
        )}
      </div>
    </div>
  );
};

export { Profile };
