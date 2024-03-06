import Banner from './components/Banner/Banner';
import { Alert, Badge, Button, Icon } from '../src/components';
import { useState } from 'react';
import './styles/app.scss';

const App = () => {
  const [show, setShow] = useState(true);
  return (
    <div className="app-container">
      <Banner name="Test!!" />
      <div>
        <Button
          label={
            <>
              Button
              <Badge type="primary" pill>
                1
              </Badge>
            </>
          }
          buttonType="primary"
          onClick={() => {}}
        />
      </div>
      <div>
        <Alert variant="danger" show={show} onClose={() => setShow(false)}>
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
