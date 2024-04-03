import './styles/app.scss';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { AppRoutes } from './routes';

const App = () => {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <div className="app-container">
        <AppRoutes />
      </div>
    </LocalizationProvider>
  );
};

export { App };
