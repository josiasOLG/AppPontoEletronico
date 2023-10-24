import { LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILURE, LOGOUT } from '../constants/actionTypes';

interface UserData {
  id: number;
  name: string;
  email: string;
}

interface LoginSuccessPayload {
  userData: UserData;
}

interface LoginFailurePayload {
  error: string;
}

export const loginRequest = () => ({
  type: LOGIN_REQUEST,
});

export const loginSuccess = (userData: UserData) => ({
  type: LOGIN_SUCCESS,
  payload: userData,
});

export const loginFailure = (error: string) => ({
  type: LOGIN_FAILURE,
  payload: error,
});

export const logout = () => ({
  type: LOGOUT,
});
