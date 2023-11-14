import { SET_TIMECIRCLE_DATA, SET_BUTTON_STATUS, SET_STATUS_TEXT } from "../constants/actionTypes";

export const setMotoristaData = (data: any) => {
  return {
    type: SET_TIMECIRCLE_DATA,
    payload: data,
  };
};

export const setButtonStatus = (isEnabled: boolean) => {
  return {
    type: SET_BUTTON_STATUS,
    payload: isEnabled,
  };
};

export const setStatusText = (statusText: string) => {
  return {
    type: SET_STATUS_TEXT,
    payload: statusText,
  };
};
