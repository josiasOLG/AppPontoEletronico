import axiosInstance from './axiosInstance';
import HttpStatusCode from '../enums/HttpStatusCode';
import * as SecureStore from 'expo-secure-store';
import UserAPI from '../user/userAPI';
import { getLogin, getPassword, saveToken, saveTokenExpiration } from '../../secure/secureStoreService';

let isRefreshing = false;

const refreshToken = async () => {
  if (isRefreshing) return;
  isRefreshing = true;
  try {
    const [username, password] = await Promise.all([getLogin(), getPassword()]);
    const { Token, Expiration } = await UserAPI.getInstance().login(username, password);
    // console.log('Token:',Token);
    await Promise.all([saveToken(Token), saveTokenExpiration(Expiration)]);
    axiosInstance.defaults.headers['Authorization'] = `Bearer ${Token}`;
  } catch (error) {
    console.error('Failed to refresh token:', error);
  } finally {
    isRefreshing = false;
  }
};

const setAuthorizationHeader = async (config) => {
  const token = await SecureStore.getItemAsync('accessToken');
  config.headers['Content-Type'] = 'application/json; charset=utf-8';
  if (token) config.headers['Authorization'] = `Bearer ${token}`;
  return config;
};

axiosInstance.interceptors.request.use(setAuthorizationHeader, Promise.reject);

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;

    if ((error.response?.status === HttpStatusCode.UNAUTHORIZED || error.response?.status === HttpStatusCode.NOT_FOUND) && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
       
        await refreshToken();
        originalRequest.headers['Authorization'] = `Bearer ${await SecureStore.getItemAsync('accessToken')}`;
        return axiosInstance(originalRequest);
      } catch (refreshError) {
        console.error(refreshError);
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

axiosInstance.interceptors.request.use(config => {
  if (config.method === 'get') {
    config.params = { ...config.params, _t: new Date().getTime() };
  }
  return config;
}, error => Promise.reject(error));
