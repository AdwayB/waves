import { FC, ReactNode } from 'react';
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import { Button } from '../Button';
import styles from './modal.module.scss';

interface ModalProps {
  actionId: string;
  open: boolean;
  handleClose: (e: object, reason: string) => void;
  handleConfirm: (id: string) => void;
  buttonloading?: boolean;
  buttonDisabled?: boolean;
  confirmVisible?: boolean;
  title?: ReactNode;
  content?: ReactNode;
}

/**
 * A styled Modal component.
 * Fully customizable Title and Content, defaults to Delete configuration.
 * Contains Close and Confirm actions.
 *
 * @param actionId - The ID sent in the Confirm callback function to identify the subject of action (eg: EventId, UserId).
 *
 * @param {ModalProps} props - The props for configuring the Menu.
 */
const Modal: FC<ModalProps> = (props) => {
  const {
    actionId = '',
    open = false,
    handleClose,
    handleConfirm,
    buttonloading = false,
    buttonDisabled = false,
    confirmVisible = true,
    title = 'Delete Event',
    content = 'Are you sure you want to delete this event? This is an irreversible action.',
  } = props;

  const handleConfirmClick = () => {
    handleConfirm(actionId);
  };

  return (
    <Dialog
      open={open}
      onClose={(e: object, reason: string) => handleClose(e, reason)}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      className={styles.modal}
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
        {confirmVisible && (
          <Button
            label="Confirm"
            buttontype="secondary"
            buttonloading={buttonloading}
            disabled={buttonDisabled}
            onClick={handleConfirmClick}
            className={styles.button}
          />
        )}
        <Button label="Cancel" onClick={() => handleClose({}, 'cancelClicked')} className={styles.button} />
      </DialogActions>
    </Dialog>
  );
};

export { Modal, ModalProps };
