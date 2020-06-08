import axios from 'axios';

const { APP_API_URL } = process.env;

const api = axios.create({
  baseURL: APP_API_URL,
});

export default api;
