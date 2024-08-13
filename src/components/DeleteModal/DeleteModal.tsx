import { FC, ReactNode } from 'react';
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import { Button } from '../Button';
import styles from './deleteModal.module.scss';

interface DeleteModalProps {
  eventId: string;
  open: boolean;
  handleClose: (e: object, reason: string) => void;
  handleConfirm: (id: string) => void;
  buttonloading: boolean;
  buttonDisabled: boolean;
  title?: ReactNode;
  content?: ReactNode;
}

const DeleteModal: FC<DeleteModalProps> = (props) => {
  const {
    eventId = '',
    open = false,
    handleClose,
    handleConfirm,
    buttonloading = false,
    buttonDisabled = false,
    title = 'Delete Event',
    content = 'Are you sure you want to delete this event? This is an irreversible action.',
  } = props;

  const handleConfirmClick = () => {
    handleConfirm(eventId);
  };

  return (
    <Dialog
      open={open}
      onClose={(e: object, reason: string) => handleClose(e, reason)}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      className={styles.deleteModal}
    >
      <DialogTitle id="alert-dialog-title" className={styles.title}>
        {title}
      </DialogTitle>
      <DialogContent className={styles.content}>
        <DialogContentText id="alert-dialog-description" className={styles.contentText}>
          {content}
        </DialogContentText>
      </DialogContent>
      <DialogActions className={styles.actions}>
        <Button
          label="Confirm"
          buttontype="secondary"
          buttonloading={buttonloading}
          disabled={buttonDisabled}
          onClick={handleConfirmClick}
          className={styles.button}
        />
        <Button label="Cancel" onClick={() => handleClose({}, 'cancelClicked')} className={styles.button} />
      </DialogActions>
    </Dialog>
  );
};

export { DeleteModal };
