import Banner from './components/Banner/Banner';
import { Button } from '../component-library';
const App = () => {
  return (
    <>
      <Banner name="Test!!" />
      <Button label="Button" primary backgroundColor="magenta" onClick={() => {}} size="medium" />
    </>
  );
};

export { App };
