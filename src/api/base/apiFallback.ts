import axios from 'axios';
import Constants from 'expo-constants';
import { API_BASE_URL } from './constants';
const API_URL = Constants.expoConfig?.extra?.apiUrl ?? 'valorPadrao';

export const apiFallback = axios.create({
  baseURL: API_BASE_URL,
  timeout: 3000,
});
