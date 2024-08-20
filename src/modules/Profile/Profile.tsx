import { FC, Suspense, lazy, useEffect, useState } from 'react';
import styles from './profile.module.scss';
import ProfilePlaceholder from '../../assets/profile_placeholder.svg';
import ModeEditOutlineIcon from '@mui/icons-material/ModeEditOutline';
import DeleteIcon from '@mui/icons-material/Delete';
import { Alert, Button, Loading } from '../../components';
import { UserData, UserLoginRequest } from '../../helpers';
import { useDispatch, useSelector } from 'react-redux';
import { selectCurrentUser, setIsAuthenticated, setUser } from '../../redux';
import { logoutUser } from '../../utils';
import { useNavigate } from 'react-router-dom';

const EditProfileForm = lazy(() =>
  import('./EditProfileForm/EditProfileForm').then((module) => ({ default: module.EditProfileForm })),
);

const ViewProfile = lazy(() => import('./ViewProfile/ViewProfile').then((module) => ({ default: module.ViewProfile })));

const sendLogout = async (userInfo: UserLoginRequest) => {
  const response = await logoutUser(userInfo);
  return response.status;
};

const Profile: FC = () => {
  document.title = 'My Profile - Waves';
  const navigate = useNavigate();
  const UserData = useSelector(selectCurrentUser);
  const dispatch = useDispatch();
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [profileData, setProfileData] = useState<UserData>({
    userId: '',
    userName: '',
    legalName: '',
    email: '',
    password: '',
    mobileNumber: '',
    country: '',
    type: '',
  });
  const [logoutLoading, setLogoutLoading] = useState<boolean>(false);
  const [logoutError, setLogoutError] = useState<boolean>(false);

  useEffect(() => {
    setProfileData({
      userId: UserData?.userId ?? '',
      userName: UserData?.userName,
      legalName: UserData?.legalName,
      email: UserData?.email ?? '',
      password: UserData?.password,
      mobileNumber: UserData?.mobileNumber,
      country: UserData?.country,
      type: UserData?.type ?? 'User',
    });
  }, [UserData]);

  const handleEditPhotoClick = () => {
    console.log('Edit photo clicked');
  };

  const handleDeletePhotoClick = () => {
    console.log('Delete photo clicked');
  };

  const handleLogoutClick = async () => {
    setLogoutLoading(true);
    const responseStatus = await sendLogout({
      email: profileData.email,
      password: profileData.password ?? '',
      type: profileData.type,
    });
    if (responseStatus !== 200) {
      setLogoutError(true);
      return;
    }
    dispatch(setUser(null));
    dispatch(setIsAuthenticated(false));
    navigate('/');
    setLogoutLoading(false);
  };

  const handleProfileEditClick = () => {
    setIsEdit(true);
  };

  const getFormComponent = () => {
    return isEdit ? <EditProfileForm userData={profileData} /> : <ViewProfile userData={profileData} />;
  };

  return (
    <>
      <Alert
        severity="error"
        visible={logoutError}
        onClose={() => {
          setLogoutError(false);
          navigate('/user');
        }}
      >
        Logout attempt failed. Please try again later.
      </Alert>
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
          <div className={styles.logoutButtonContainer}>
            <Button
              label="Logout User"
              onClick={handleLogoutClick}
              buttonloading={logoutLoading}
              className={styles.logoutButton}
            />
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
    </>
  );
};

export { Profile };
