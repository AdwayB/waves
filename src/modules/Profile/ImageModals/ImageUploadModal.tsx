import { ChangeEvent, FC, useState } from 'react';
import { Modal, ModalProps } from '../../../components';
import styles from './imageUploadModal.module.scss';

interface ImageUploadModalProps extends ModalProps {
  onUpload: (image: string | null) => Promise<void>;
}

const validFileTypes = ['image/jpeg', 'image/jpg', 'image/png'];

const ImageUploadModal: FC<ImageUploadModalProps> = (props) => {
  const { actionId, open, handleClose, handleConfirm, buttonloading, buttonDisabled, onUpload } = props;
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [convertedImage, setConvertedImage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const convertToBase64 = (file: File | null) => {
    if (file === null) {
      return;
    }
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setConvertedImage(reader.result as string);
    };
  };

  const handleImageChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && validFileTypes.includes(file.type)) {
      setSelectedImage(file);
      setErrorMessage(null);
      convertToBase64(file);
    } else {
      setErrorMessage('Only JPG, JPEG, and PNG files are allowed.');
      setSelectedImage(null);
    }
  };

  const handleUploadConfirm = async () => {
    await onUpload(convertedImage ? convertedImage : null);
    handleConfirm(actionId);
  };

  return (
    <Modal
      actionId={actionId}
      open={open}
      handleClose={handleClose}
      handleConfirm={handleUploadConfirm}
      buttonloading={buttonloading}
      buttonDisabled={buttonDisabled || !selectedImage}
      title="Upload Profile Photo"
      content={
        <>
          <input
            type="file"
            accept={validFileTypes.join(', ')}
            onChange={handleImageChange}
            className={styles.imageUpload}
          />
          {errorMessage && <p className={styles.errorMessage}>{errorMessage}</p>}
        </>
      }
    />
  );
};

export { ImageUploadModal };
