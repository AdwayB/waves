import { FC, Suspense, lazy, useState } from 'react';
import styles from './profile.module.scss';
import ProfilePlaceholder from '../../assets/profile_placeholder.svg';
import { Button, Loading } from '../../components';

const EditProfileForm = lazy(() =>
  import('./EditProfileForm/EditProfileForm').then((module) => ({ default: module.EditProfileForm })),
);

const ViewProfile = lazy(() => import('./ViewProfile/ViewProfile').then((module) => ({ default: module.ViewProfile })));

const Profile: FC = () => {
  const [isEdit, setIsEdit] = useState<boolean>(false);

  const handleEditPhotoClick = () => {
    console.log('Edit photo clicked');
  };

  const handleDeletePhotoClick = () => {
    console.log('Delete photo clicked');
  };

  const handleProfileEditClick = () => {
    setIsEdit(!isEdit);
  };

  const getFormComponent = () => {
    return isEdit ? <EditProfileForm /> : <ViewProfile />;
  };

  return (
    <div className={styles.profileContainer}>
      <div className={styles.leftContainer}>
        <div className={styles.profileImageContainer}>
          <div className={styles.profileImage}>
            <img src={ProfilePlaceholder} alt="Profile Placeholder" className={styles.profilePlaceholder} />
          </div>
          <div className={styles.changeDeleteButton}>
            <Button buttontype="secondary" label="Change" onClick={handleEditPhotoClick} />
            <Button label="Delete" onClick={handleDeletePhotoClick} />
          </div>
        </div>
      </div>
      <div className={styles.rightContainer}>
        <div className={styles.profileInfoContainer}>
          <Suspense fallback={<Loading />}>{getFormComponent()}</Suspense>
        </div>
        <Button label="Edit Profile" onClick={handleProfileEditClick} className={styles.editProfileButton} />
      </div>
    </div>
  );
};

export { Profile };
