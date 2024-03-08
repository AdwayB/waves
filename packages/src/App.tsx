import Banner from './components/Banner/Banner';
import { ActionButton, Alert, Badge, Button, Checkbox, Icon } from '../src/components';
import { useEffect, useState } from 'react';
import './styles/app.scss';
import AddIcon from '@mui/icons-material/Add';

const App = () => {
  const [show, setShow] = useState<boolean>(false);
  const [openCheck, setOpenCheck] = useState<boolean>(false);
  const [closeCheck, setCloseCheck] = useState<boolean>(false);
  const [count, setCount] = useState<number>(0);

  useEffect(() => {
    if (show) {
      setCount((prevCount) => prevCount + 1);
      setOpenCheck(true);
      setCloseCheck(false);
    } else {
      setOpenCheck(false);
      setCloseCheck(true);
    }
  }, [show]);

  return (
    <div className="app-container">
      <Banner name="Test!!" />
      <div>
        <Button
          label={
            <>
              <Badge content={count} variant="standard" type="success">
                Toggle Alert
              </Badge>
            </>
          }
          buttonType="primary"
          onClick={() => {
            setShow(!show);
          }}
        />
      </div>
      <div>
        <Alert
          severity="warning"
          visible={show}
          onClose={(e) => {
            e.stopPropagation();
            setShow(false);
          }}
        >
          Sample Alert Here
        </Alert>
        <div style={{ height: '20px' }}>
          <Icon type={'logo'} />
        </div>
      </div>
      <div>
        <Checkbox
          direction="row"
          items={[
            {
              type: 'primary',
              checked: openCheck,
              label: 'Primary Alert Open',
              onClick: () => {
                setShow(true);
              },
            },
            {
              type: 'secondary',
              checked: closeCheck,
              label: 'Secondary Alert Close',
              onClick: () => {
                setShow(false);
              },
            },
          ]}
        />
      </div>
      <div>
        test this{' '}
        <ActionButton onClick={() => {}} type="primary">
          <AddIcon />
        </ActionButton>
      </div>
    </div>
  );
};

export { App };
