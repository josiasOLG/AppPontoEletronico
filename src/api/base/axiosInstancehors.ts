import axios from 'axios';
import { API_BASE_URL_HORS } from './constants';
const axiosInstanceHors = axios.create({
  baseURL: API_BASE_URL_HORS,
  timeout: 5000,
});
export default axiosInstanceHors;
