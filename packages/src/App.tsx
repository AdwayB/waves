import Banner from './components/Banner/Banner';
import { Alert, Badge, Button, Icon } from '../src/components';
import { useEffect, useState } from 'react';
import './styles/app.scss';

const App = () => {
  const [show, setShow] = useState<boolean>(false);
  const [count, setCount] = useState<number>(0);

  useEffect(() => {
    if (show) {
      setCount((prevCount) => prevCount + 1);
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
    </div>
  );
};

export { App };
