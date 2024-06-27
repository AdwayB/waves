import './styles/app.scss';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ThemeProvider, createTheme } from '@mui/material';
import { AppRoutes } from './routes';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import { Provider } from 'react-redux';
import { store } from './redux';

const THEME = createTheme({
  typography: {
    fontFamily: '"Open Sans", "Helvetica", "Arial", sans-serif',
  },
});

dayjs.extend(utc);

const App = () => {
  const queryClient = new QueryClient();

  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <ThemeProvider theme={THEME}>
            <div className="app-container">
              <AppRoutes />
            </div>
          </ThemeProvider>
        </LocalizationProvider>
      </QueryClientProvider>
    </Provider>
  );
};

export { App };
