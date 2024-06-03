import * as SecureStore from "expo-secure-store";

const secureOptions = {
  requireAuthentication: false,
  keychainAccessible: SecureStore.ALWAYS_THIS_DEVICE_ONLY,
};

const TOKEN_KEY = "accessToken";
const TOKEN_EXPIRATION_KEY = "refreshToken";
const LOGIN_KEY = "userLogin";
const PASSWORD_KEY = "userPassword";
const PROFILE_KEY = "PROFILE";
const LOCATION_KEY = "userLocation";

// Salvar Localização
export const saveLocation = async (location: any) => {
  const locationString = JSON.stringify(location);
  await SecureStore.setItemAsync(LOCATION_KEY, locationString, secureOptions);
};

// Recuperar Localização
export const getLocation = async () => {
  const locationString = await SecureStore.getItemAsync(
    LOCATION_KEY,
    secureOptions
  );
  return locationString ? JSON.parse(locationString) : null;
};

// Salvar Token
export const saveToken = async (token: any) => {
  await SecureStore.setItemAsync(TOKEN_KEY, token, secureOptions);
};

// Recuperar Token
export const getToken = async () => {
  return await SecureStore.getItemAsync(TOKEN_KEY, secureOptions);
};

// Salvar Data de Expiração do Token
export const saveTokenExpiration = async (expiration: string) => {
  await SecureStore.setItemAsync(
    TOKEN_EXPIRATION_KEY,
    expiration,
    secureOptions
  );
};

// Recuperar Data de Expiração do Token
export const getTokenExpiration = async () => {
  return await SecureStore.getItemAsync(TOKEN_EXPIRATION_KEY, secureOptions);
};

// Salvar Login
export const saveLogin = async (login: string) => {
  await SecureStore.setItemAsync(LOGIN_KEY, login, secureOptions);
};

// Recuperar Login
export const getLogin = async () => {
  return await SecureStore.getItemAsync(LOGIN_KEY, secureOptions);
};

// Salvar Senha
export const savePassword = async (password: string) => {
  await SecureStore.setItemAsync(PASSWORD_KEY, password, secureOptions);
};

// Recuperar Senha
export const getPassword = async () => {
  return await SecureStore.getItemAsync(PASSWORD_KEY, secureOptions);
};

export const saveProfile = async (item: any) => {
  const jsonString = JSON.stringify(item);
  return await SecureStore.setItemAsync(PROFILE_KEY, jsonString, secureOptions);
};

export const getProfile = async () => {
  const jsonString = await SecureStore.getItemAsync(PROFILE_KEY, secureOptions);
  return jsonString ? JSON.parse(jsonString) : null;
};

// Limpar Dados
export const clearAll = async () => {
  await SecureStore.deleteItemAsync(TOKEN_KEY, secureOptions);
  await SecureStore.deleteItemAsync(TOKEN_EXPIRATION_KEY, secureOptions);
  await SecureStore.deleteItemAsync(LOGIN_KEY, secureOptions);
  await SecureStore.deleteItemAsync(PASSWORD_KEY, secureOptions);
};
