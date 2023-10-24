import axios from 'axios';

export const apiFallback = axios.create({
  baseURL: 'http://192.168.56.1:5000',
  timeout: 3000,
});
