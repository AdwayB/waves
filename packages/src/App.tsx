import Banner from './components/Banner/Banner';
import {
  ActionButton,
  Alert,
  Avatar,
  Badge,
  Button,
  Checkbox,
  DatePicker,
  Divider,
  Icon,
  InputField,
  InputNumber,
  Menu,
  Radio,
  Rating,
  Select,
  Switch,
} from '../src/components';
import AddIcon from '@mui/icons-material/Add';
import { useEffect, useState } from 'react';
import './styles/app.scss';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs, { Dayjs } from 'dayjs';

const App = () => {
  const [show, setShow] = useState<boolean>(false);
  const [openCheck, setOpenCheck] = useState<boolean>(false);
  const [closeCheck, setCloseCheck] = useState<boolean>(false);
  const [count, setCount] = useState<number>(0);
  const [bannerText, setBannerText] = useState<string>('Test!');
  const [date, setDate] = useState<Dayjs>(dayjs());

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
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <div className="app-container">
        <Banner name={bannerText} />
        <div>
          <Rating value={2.3} />
        </div>
        <div style={{ width: '300px' }}>
          <DatePicker
            label="Set Date"
            value={date}
            onChange={(date) => setDate(date)}
            size="small"
            id="input-date-picker"
            style="secondary"
            required
          />
        </div>
        <div style={{ width: '300px' }}>
          <InputNumber
            label="Set Count"
            value={count}
            onChange={(e) => {
              const inputValue = e.target.value.trim();
              if (inputValue === '') {
                setCount(0);
              } else {
                setCount(parseInt(inputValue));
              }
            }}
            type="secondary"
            suffixText="bottom"
          />
        </div>
        <div style={{ width: '300px' }}>
          <InputField
            label="Set Banner Text"
            value={bannerText}
            onChange={(e) => {
              setBannerText(e.target.value);
            }}
          />
        </div>
        <div style={{ width: '300px' }}>
          <InputField
            type="password"
            style="secondary"
            label="Set Banner Text"
            value={bannerText}
            onChange={(e) => {
              setBannerText(e.target.value);
            }}
          />
        </div>
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
    </LocalizationProvider>
  );
};

export { App };
