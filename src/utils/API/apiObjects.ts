import axios from 'axios';

const authAPI = axios.create({
  baseURL: `${process.env.WAVES_SERVER_URL}/api/auth`,
  withCredentials: true,
});

const usersAPI = axios.create({
  baseURL: `${process.env.WAVES_USER_URL}/api/user`,
  withCredentials: true,
});

const eventsAPI = axios.create({
  baseURL: `${process.env.WAVES_EVENTS_URL}/api/events`,
  withCredentials: true,
});

const feedbackAPI = axios.create({
  baseURL: `${process.env.WAVES_EVENTS_URL}/api/feedback`,
  withCredentials: true,
});

const paymentsAPI = axios.create({
  baseURL: `${process.env.WAVES_EVENTS_URL}/api/payments`,
  withCredentials: true,
});

export { authAPI, usersAPI, eventsAPI, feedbackAPI, paymentsAPI };
