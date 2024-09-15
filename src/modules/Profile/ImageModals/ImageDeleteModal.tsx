import { FC } from 'react';
import { Modal, ModalProps } from '../../../components';

interface ImageDeleteModalProps extends ModalProps {
  onDelete: () => Promise<void>;
}

const ImageDeleteModal: FC<ImageDeleteModalProps> = (props) => {
  const { actionId, open, handleClose, handleConfirm, buttonloading, buttonDisabled, onDelete } = props;

  const handleDeleteConfirm = async () => {
    await onDelete();
    handleConfirm(actionId);
  };

  return (
    <Modal
      actionId={actionId}
      open={open}
      handleClose={handleClose}
      handleConfirm={handleDeleteConfirm}
      buttonloading={buttonloading}
      buttonDisabled={buttonDisabled}
      title="Delete Profile Photo"
      content="Are you sure you want to delete your profile photo? This action cannot be undone."
    />
  );
};

export { ImageDeleteModal };
