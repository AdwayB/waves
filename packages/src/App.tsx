import Banner from './components/Banner/Banner';
import {
  ActionButton,
  Alert,
  Avatar,
  Badge,
  Button,
  Checkbox,
  Divider,
  Icon,
  Menu,
  Radio,
  Select,
  Switch,
} from '../src/components';
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
        <Menu
          items={[
            { label: 'Open Alert', onClick: () => setShow(true) },
            { label: 'Close Alert', onClick: () => setShow(false) },
          ]}
        />
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
        test divider primary
        <Divider />
        test divider secondary
        <Divider type="secondary" />
        <Radio
          items={[
            {
              value: 'open',
              type: 'primary',
              label: 'Primary Alert Open',
            },
            {
              value: 'close',
              type: 'secondary',
              label: 'Secondary Alert Close',
            },
          ]}
          value={openCheck ? 'open' : 'close'}
          onChange={(e) => {
            if (e?.target.value == 'open') {
              setShow(true);
              console.log('open');
            } else {
              setShow(false);
              console.log('close');
            }
          }}
        />
      </div>
      <div>
        test this
        <ActionButton onClick={() => {}} type="primary">
          <AddIcon />
        </ActionButton>
      </div>
      <div style={{ width: '200px', paddingTop: '10px' }}>
        <Select
          label={'Test This Too'}
          style="chip"
          value={openCheck ? ['open'] : ['close']}
          onChange={(e: any) => {
            if (e?.target.value == 'open') {
              setShow(true);
            } else {
              setShow(false);
            }
          }}
          options={[
            {
              value: 'open',
              label: 'open',
            },
            {
              value: 'close',
              label: 'close',
            },
          ]}
        />
      </div>
      <div>
        <Switch
          label={'Toggle Alert'}
          checked={openCheck}
          onChange={(e) => {
            if (e?.target.checked) {
              setShow(true);
            } else {
              setShow(false);
            }
          }}
        />
      </div>
      <div>
        Avatar with icon
        <Avatar name="test">
          <AddIcon />
        </Avatar>
      </div>
      <div>
        Avatar with Name not strict
        <Avatar name="Adway Byju">Adway Byju</Avatar>
      </div>
      <div>
        Avatar with Name strict
        <Avatar name="Adway Byju" strict>
          Adway Byju
        </Avatar>
      </div>
      <div>
        Avatar Group
        <Avatar
          grouped
          max={5}
          total={12}
          items={[
            { name: 'Adway Byju', src: 'https://picsum.photos/200/300' },
            { name: 'Adway Byju', src: 'https://picsum.photos/200/400' },
            { name: 'Adway Byju', src: 'https://picsum.photos/200/500' },
            { name: 'Adway Byju' },
            { name: 'Adway Byju' },
            { name: 'Adway Byju' },
            { name: 'Adway Byju' },
            { name: 'Adway Byju' },
          ]}
        />
      </div>
    </div>
  );
};

export { App };
