import * as SecureStore from 'expo-secure-store';

const TOKEN_KEY = 'accessToken';
const TOKEN_EXPIRATION_KEY = 'refreshToken';
const LOGIN_KEY = 'userLogin';
const PASSWORD_KEY = 'userPassword';
const PROFILE_KEY = 'PROFILE';

// Salvar Token
export const saveToken = async (token: any) => {
  await SecureStore.setItemAsync(TOKEN_KEY, token);
};

// Recuperar Token
export const getToken = async () => {
  return await SecureStore.getItemAsync(TOKEN_KEY);
};

// Salvar Data de Expiração do Token
export const saveTokenExpiration = async (expiration: string) => {
  await SecureStore.setItemAsync(TOKEN_EXPIRATION_KEY, expiration);
};

// Recuperar Data de Expiração do Token
export const getTokenExpiration = async () => {
  return await SecureStore.getItemAsync(TOKEN_EXPIRATION_KEY);
};

// Salvar Login
export const saveLogin = async (login: string) => {
  await SecureStore.setItemAsync(LOGIN_KEY, login);
};

// Recuperar Login
export const getLogin = async () => {
  return await SecureStore.getItemAsync(LOGIN_KEY);
};

// Salvar Senha
export const savePassword = async (password: string) => {
  await SecureStore.setItemAsync(PASSWORD_KEY, password);
};

// Recuperar Senha
export const getPassword = async () => {
  return await SecureStore.getItemAsync(PASSWORD_KEY);
};

export const saveProfile = async (item: any) => {
  const jsonString = JSON.stringify(item);
  return await SecureStore.setItemAsync(PROFILE_KEY, jsonString);
};

export const getProfile = async () => {
  const jsonString = await SecureStore.getItemAsync(PROFILE_KEY);
  return jsonString ? JSON.parse(jsonString) : null;
};

// Limpar Dados
export const clearAll = async () => {
  await SecureStore.deleteItemAsync(TOKEN_KEY);
  await SecureStore.deleteItemAsync(TOKEN_EXPIRATION_KEY);
  await SecureStore.deleteItemAsync(LOGIN_KEY);
  await SecureStore.deleteItemAsync(PASSWORD_KEY);
};
