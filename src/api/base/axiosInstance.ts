import axios from 'axios';
const axiosInstance = axios.create({
  baseURL: process.env.API_URL, // Usar apiUrl diretamente
  timeout: 3000,
});
export default axiosInstance;
