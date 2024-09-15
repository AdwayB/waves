import { FC, Suspense, lazy, useCallback, useEffect, useState } from 'react';
import styles from './profile.module.scss';
import ProfilePlaceholder from '../../assets/profile_placeholder.svg';
import ModeEditOutlineIcon from '@mui/icons-material/ModeEditOutline';
import DeleteIcon from '@mui/icons-material/Delete';
import { Alert, Button, Loading } from '../../components';
import { UserData, UserLoginRequest } from '../../helpers';
import { useDispatch, useSelector } from 'react-redux';
import { selectCurrentUser, setIsAuthenticated, setUser } from '../../redux';
import { deleteProfilePhoto, getProfilePhoto, logoutUser, setProfilePhoto } from '../../utils';
import { useNavigate } from 'react-router-dom';

const EditProfileForm = lazy(() =>
  import('./EditProfileForm/EditProfileForm').then((module) => ({ default: module.EditProfileForm })),
);
const ViewProfile = lazy(() => import('./ViewProfile/ViewProfile').then((module) => ({ default: module.ViewProfile })));

const ImageUploadModal = lazy(() =>
  import('./ImageModals/ImageUploadModal').then((module) => ({ default: module.ImageUploadModal })),
);
const ImageDeleteModal = lazy(() =>
  import('./ImageModals/ImageDeleteModal').then((module) => ({ default: module.ImageDeleteModal })),
);

const sendLogout = async (userInfo: UserLoginRequest) => {
  const response = await logoutUser(userInfo);
  return response.status;
};

const getProfileImage = async () => {
  const response = await getProfilePhoto();
  return response;
};

const setProfileImage = async (profilePhotoAsString: string) => {
  const response = await setProfilePhoto(profilePhotoAsString);
  return response.status;
};

const deleteProfileImage = async () => {
  const response = await deleteProfilePhoto();
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
  const [imgSource, setImgSource] = useState<unknown>(ProfilePlaceholder);
  const [isImageLoading, setIsImageLoading] = useState<boolean>(false);
  const [isImageError, setIsImageError] = useState<boolean>(false);
  const [isImageUploading, setIsImageUploading] = useState<boolean>(false);
  const [isImageDeleting, setIsImageDeleting] = useState<boolean>(false);
  const [imageErrorMessage, setImageErrorMessage] = useState<string>('Failed to get profile image.');
  const [isUploadModalOpen, setIsUploadModalOpen] = useState<boolean>(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<boolean>(false);

  const getImage = useCallback(async () => {
    setIsImageLoading(true);
    try {
      const response = await getProfileImage();
      if (response.status === 200) {
        if (!!response.data) {
          setImgSource(response.data as string);
        } else {
          setImgSource(ProfilePlaceholder as File);
        }
      } else {
        setImgSource(ProfilePlaceholder as File);
        setIsImageError(true);
        setIsImageLoading(false);
      }
    } catch (error) {
      setImgSource(ProfilePlaceholder as File);
      setIsImageError(true);
      setIsImageLoading(false);
      setImageErrorMessage('Failed to get profile image.');
      console.log(`Failed to get profile image: ${error}`);
    } finally {
      setIsImageLoading(false);
    }
  }, []);

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

    const getProfileImage = async () => {
      await getImage();
    };

    getProfileImage();
  }, [UserData, getImage]);

  const handleEditPhotoClick = useCallback(
    async (convertedImage: string | null) => {
      console.log('Edit photo clicked');
      if (convertedImage === null) {
        return;
      }
      try {
        setIsImageUploading(true);
        const response = await setProfileImage(convertedImage);

        if (response === 200) {
          setIsImageUploading(false);
          await getImage();
        } else {
          setIsImageUploading(false);
          setIsImageError(true);
        }
      } catch (error) {
        setIsImageUploading(false);
        setIsImageError(true);
        setImageErrorMessage('Failed to edit profile image.');
        console.log(`Failed to edit profile image: ${error}`);
      } finally {
        setIsImageUploading(false);
      }
    },
    [getImage],
  );

  const handleDeletePhotoClick = useCallback(async () => {
    console.log('Delete photo clicked');
    try {
      setIsImageDeleting(true);
      const response = await deleteProfileImage();

      if (response === 200) {
        setIsImageDeleting(false);
        await getImage();
      } else {
        setIsImageDeleting(false);
        setIsImageError(true);
      }
    } catch (error) {
      setIsImageDeleting(false);
      setIsImageError(true);
      setImageErrorMessage('Failed to delete profile image.');
      console.log(`Failed to delete profile image: ${error}`);
    } finally {
      setIsImageDeleting(false);
    }
  }, [getImage]);

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
    } else {
      dispatch(setUser(null));
      dispatch(setIsAuthenticated(false));
      navigate('/');
    }
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
      <Alert severity="error" visible={isImageError} onClose={() => setIsImageError(false)}>
        {imageErrorMessage}
      </Alert>
      <div className={styles.profileContainer}>
        <div className={styles.leftContainer}>
          <div className={styles.profileImageText}>Profile Photo</div>
          <div className={styles.profileImageContainer}>
            <div className={styles.profileImage}>
              {isImageLoading || isImageUploading ? (
                <Loading />
              ) : (
                <img src={imgSource as string} alt="Profile Placeholder" className={styles.profilePlaceholder} />
              )}
            </div>
          </div>
          <div className={styles.changeDeleteButtons}>
            <Button
              buttontype="secondary"
              label={<ModeEditOutlineIcon />}
              onClick={() => setIsUploadModalOpen(true)}
              className={styles.changeButton}
              buttonloading={isImageUploading}
              disabled={isImageLoading || isImageUploading || isImageDeleting}
            />
            <Button
              label={<DeleteIcon />}
              onClick={() => setIsDeleteModalOpen(true)}
              className={styles.deleteButton}
              buttonloading={isImageDeleting}
              disabled={isImageLoading || isImageUploading || isImageDeleting}
            />
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
        <ImageUploadModal
          actionId="upload"
          open={isUploadModalOpen}
          handleClose={() => setIsUploadModalOpen(false)}
          handleConfirm={() => setIsUploadModalOpen(false)}
          buttonloading={isImageUploading}
          buttonDisabled={false}
          onUpload={handleEditPhotoClick}
        />
        <ImageDeleteModal
          actionId="delete"
          open={isDeleteModalOpen}
          handleClose={() => setIsDeleteModalOpen(false)}
          handleConfirm={() => setIsDeleteModalOpen(false)}
          buttonloading={isImageDeleting}
          buttonDisabled={false}
          onDelete={handleDeletePhotoClick}
        />
      </div>
    </>
  );
};

export { Profile };
