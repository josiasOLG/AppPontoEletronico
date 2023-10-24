import axiosInstance from './axiosInstance';
import HttpStatusCode from '../enums/HttpStatusCode';
import * as SecureStore from 'expo-secure-store';
import { apiFallback } from './apiFallback';

const refreshToken = async () => {
  try {
    // Obter o refresh token do armazenamento seguro
    const savedRefreshToken = await SecureStore.getItemAsync('refreshToken');

    if (!savedRefreshToken) {
      throw new Error('No refresh token found');
    }

    // Fazer a requisição para renovar o token
    const response = await axiosInstance.post('/refresh-token', {
      refreshToken: savedRefreshToken,
    });

    const { accessToken, refreshToken: newRefreshToken } = response.data;

    // Armazenar o novo access token e o refresh token
    await SecureStore.setItemAsync('accessToken', accessToken);
    await SecureStore.setItemAsync('refreshToken', newRefreshToken);

    // Atualizar o header de autorização
    axiosInstance.defaults.headers['Authorization'] = `Bearer ${accessToken}`;
  } catch (error) {
    // Handle the error appropriately
    console.error('Failed to refresh token: ', error);
  }
};

axiosInstance.interceptors.request.use(async (config) => {
  const token = await SecureStore.getItemAsync('accessToken');
  if (token) {
    config.headers['Authorization'] = `Bearer ${token}`;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

axiosInstance.interceptors.response.use((response) => {
  return response;
}, async (error) => {
  const originalRequest = error.config;

  if (error.response?.status === HttpStatusCode.UNAUTHORIZED) {
    await refreshToken();

    // Pegar o novo token atualizado e adicionar no header
    originalRequest.headers['Authorization'] = `Bearer ${await SecureStore.getItemAsync('accessToken')}`;
    
    // Tenta a chamada com o axiosInstance (API real) novamente
    return axiosInstance(originalRequest)
      .catch(async (axiosError) => {
        if (axiosError.response?.status === HttpStatusCode.UNAUTHORIZED) {
          // Se falhar novamente, tenta a chamada com o apiFallback (json-server)
          return apiFallback(originalRequest);
        }
        return Promise.reject(axiosError);
      });
  }

  return Promise.reject(error);
});