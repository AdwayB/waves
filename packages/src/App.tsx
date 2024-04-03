import './styles/app.scss';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { Login, Signup } from './modules';

const App = () => {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <div className="app-container">
        <Signup />
        <Login />
      </div>
    </LocalizationProvider>
  );
};

export { App };
