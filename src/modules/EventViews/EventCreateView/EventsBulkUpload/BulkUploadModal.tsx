import { ChangeEvent, FC, useState } from 'react';
import { Alert, Button, Loading, Modal, ModalProps } from '../../../../components';
import styles from './bulkUploadModal.module.scss';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import FileDownloadDoneIcon from '@mui/icons-material/FileDownloadDone';
import FileDownloadOffIcon from '@mui/icons-material/FileDownloadOff';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import CloudDoneIcon from '@mui/icons-material/CloudDone';
import { getBulkUploadTemplate, uploadBulkEventData } from '../../../../utils';
import { BulkUploadResponse } from '../../../../helpers';
import { useNavigate } from 'react-router-dom';
import * as signalR from '@microsoft/signalr';

interface BulkUploadModalProps extends Omit<ModalProps, 'actionId' | 'handleConfirm'> {}

const getBulkTemplate = async () => {
  const response = await getBulkUploadTemplate();
  return response;
};

const sendBulkData = async (connectionId: string, file: FormData) => {
  const response = await uploadBulkEventData(connectionId, file);
  return response;
};

const BulkUploadModalContent = (
  onFileChange: (event: ChangeEvent<HTMLInputElement>) => void,
  onClickDownloadTemplate: () => void,
  isDownloadingTemplate: boolean,
  isDownloadedTemplate: boolean,
  isDownloadTemplateError: boolean,
  isUploadingFile: boolean,
  isUploadedFile: boolean,
  isUploadFileError: boolean,
  loadingPercentage: number,
  failedEventNames: string,
) => (
  <div className={styles.modalContent}>
    <div className={styles.modalContentHeading}>
      <span className={styles.headingText}>Download Template File:</span>
      {isDownloadedTemplate ? (
        <Button label={<FileDownloadDoneIcon className={styles.headingIcon} />} onClick={() => {}} />
      ) : (
        <Button
          label={<FileDownloadIcon className={styles.headingIcon} />}
          onClick={onClickDownloadTemplate}
          buttonloading={isDownloadingTemplate}
        />
      )}
      {isDownloadTemplateError && (
        <Button label={<FileDownloadOffIcon className={styles.headingIcon} />} onClick={() => {}} />
      )}
    </div>
    <span className={styles.modalContentBodyTextHeading}>
      Please ensure you adhere to the Events Bulk Upload template strictly, do not delete any existing rows or columns
      (legend and sample data included).
    </span>
    <div className={styles.modalContentBody}>
      <div className={styles.modalContentBodyUploadSection}>
        <span className={styles.modalContentBodyUploadSectionHeadingText}>
          Upload Bulk Data File (Accepted Format: .xlsx):
        </span>
        <span className={styles.modalContentBodyUploadSectionHeadingIcon}>
          {isUploadedFile ? (
            <Button label={<CloudDoneIcon className={styles.headingIcon} />} onClick={() => {}} />
          ) : (
            <>
              <Button
                label={<UploadFileIcon className={styles.headingIcon} />}
                onClick={() => document.getElementById('fileInput')?.click()}
                buttonloading={isUploadingFile}
              />
              <input id="fileInput" type="file" accept=".xlsx" style={{ display: 'none' }} onChange={onFileChange} />
            </>
          )}
          {isUploadFileError && (
            <Button label={<FileDownloadOffIcon className={styles.headingIcon} />} onClick={() => {}} />
          )}
        </span>
      </div>
      {isUploadingFile && (
        <div className={styles.modalContentBodyProgressSection}>
          <Loading type="progress" value={loadingPercentage} />
        </div>
      )}
      {/* Uncomment to test */}
      {/* <div className={styles.modalContentBodyProgressSection}>
        <Loading type="progress" value={70} />
      </div> */}
      {!!failedEventNames && failedEventNames.length > 0 && (
        <div className={styles.modalContentBodyErrorSection}>
          <span className={styles.modalContentBodyErrorSectionHeading}>
            The following events were parsed unsuccessfully, please verify that the data entered is valid.
          </span>
          <span className={styles.modalContentBodyErrorSectionText}>{failedEventNames}</span>
        </div>
      )}
      {/* Uncomment to test */}
      {/* <div className={styles.modalContentBodyErrorSection}>
        <span className={styles.modalContentBodyErrorSectionHeading}>
          The following events were parsed unsuccessfully, please verify that the data entered is valid.
        </span>
        <span className={styles.modalContentBodyErrorSectionText}>
          sdvpueabhpaeur, vqrwpuovbqpw9u, vwrpoiuvghwpubw, vwrpouhwqrpovubqwrv, vqwp9roiuhwprovbqwpr98uvgrw,
          qvwpourghwrpovugqwrpvnbqwpr9u
        </span>
      </div> */}
    </div>
  </div>
);

const BulkUploadModal: FC<BulkUploadModalProps> = (props) => {
  const navigate = useNavigate();
  const { open, handleClose } = props;
  const [isDownloadingTemplate, setIsDownloadingTemplate] = useState<boolean>(false);
  const [isDownloadedTemplate, setIsDownloadedTemplate] = useState<boolean>(false);
  const [isDownloadTemplateError, setIsDownloadTemplateError] = useState<boolean>(false);
  const [downloadErrorAlert, setDownloadErrorAlert] = useState<boolean>(false);

  const [isUploadingFile, setIsUploadingFile] = useState<boolean>(false);
  const [isUploadedFile, setIsUploadedFile] = useState<boolean>(false);
  const [isUploadTemplateError, setIsUploadTemplateError] = useState<boolean>(false);
  const [uploadErrorAlert, setUploadErrorAlert] = useState<boolean>(false);
  const [uploadSuccessAlert, setUploadSuccessAlert] = useState<boolean>(false);

  const [loadingPercentage, setLoadingPercentage] = useState<number>(0);
  const [failedEventNames, setFailedEventNames] = useState<string>('');

  const onClickDownloadTemplate = async () => {
    setIsDownloadingTemplate(true);
    setIsDownloadTemplateError(false);
    setDownloadErrorAlert(false);
    try {
      const response = await getBulkTemplate();
      if (response.status === 200) {
        const url = window.URL.createObjectURL(response.data as Blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = 'EventsBulkUploadTemplate.xlsx';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        setIsDownloadingTemplate(false);
        setIsDownloadedTemplate(true);
      } else {
        setIsDownloadTemplateError(true);
        setDownloadErrorAlert(true);
      }
    } catch (error) {
      setIsDownloadTemplateError(true);
      setDownloadErrorAlert(true);
      console.log(`Failed to download template: ${error}`);
    } finally {
      setIsDownloadingTemplate(false);
    }
  };

  const onFileChange = async (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      await onClickUploadFile(event.target.files[0]);
    }
  };

  const onClickUploadFile = async (file: File) => {
    if (!file) {
      alert('Please select a file to upload.');
      return;
    }

    setIsUploadingFile(true);
    try {
      const connection = new signalR.HubConnectionBuilder()
        .withUrl('/progress')
        .configureLogging(signalR.LogLevel.Information)
        .build();

      await connection.start();
      const connectionId = connection.connectionId;

      connection.on('ReceiveProgress', (progress: number) => {
        setLoadingPercentage(progress);
        if (progress >= 100) {
          setIsUploadedFile(true);
          setUploadSuccessAlert(true);
          connection.stop();
        }
      });

      const formData = new FormData();
      formData.append('file', file);

      const response = await sendBulkData(connectionId ?? '', formData);

      if (response.status !== 200) {
        setIsUploadTemplateError(true);
        setUploadErrorAlert(true);
        return;
      }

      const data = response.data as BulkUploadResponse;
      if (!!data.failedEvents && data.failedEvents.length > 0) {
        setFailedEventNames(data.failedEvents.join('; '));
        console.warn(`Some events failed to upload: ${data.failedEvents.join('; ')}`);
      }
    } catch (error) {
      console.error('Error uploading file:', error);
      setIsUploadTemplateError(true);
      setUploadErrorAlert(true);
    } finally {
      setIsUploadingFile(false);
    }
  };

  return (
    <>
      <Alert severity="error" visible={downloadErrorAlert} onClose={() => setDownloadErrorAlert(false)}>
        An error occurred when fetching the template, please try again later.
      </Alert>
      <Alert severity="error" visible={uploadErrorAlert} onClose={() => setUploadErrorAlert(false)}>
        An error occurred when uploading the bulk data, please try again later.
      </Alert>
      <Alert
        severity="success"
        visible={uploadSuccessAlert}
        onClose={() => {
          setUploadSuccessAlert(false);
          navigate('/user');
        }}
      >
        Successfully uploaded bulk data!
      </Alert>
      <Modal
        open={open}
        handleClose={handleClose}
        handleConfirm={() => {}}
        confirmVisible={false}
        actionId={''}
        title="Events Bulk Upload"
        content={BulkUploadModalContent(
          onFileChange,
          onClickDownloadTemplate,
          isDownloadingTemplate,
          isDownloadedTemplate,
          isDownloadTemplateError,
          isUploadingFile,
          isUploadedFile,
          isUploadTemplateError,
          loadingPercentage,
          failedEventNames,
        )}
      />
    </>
  );
};

export { BulkUploadModal };
