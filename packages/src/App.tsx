import Banner from './components/Banner/Banner';
import { Button } from '../src/components';

const App = () => {
  return (
    <>
      <Banner name="Test!!" />
      <div>
        <Button label="Button" buttonType="primary" onClick={() => {}} />
      </div>
    </>
  );
};

export { App };
