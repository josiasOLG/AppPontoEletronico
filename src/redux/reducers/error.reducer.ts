// reducer.ts

import {
  SHOW_ERROR_TOAST,
  SHOW_SUCCESS_TOAST,
  SHOW_WARNING_TOAST,
} from "../constants/errorTypes";

const initialState = {
  toastMessage: null,
  toastType: null,
};

export const errorReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case SHOW_SUCCESS_TOAST:
      return { ...state, toastMessage: action.payload, toastType: "success" };
    case SHOW_ERROR_TOAST:
      return { ...state, toastMessage: action.payload, toastType: "error" };
    case SHOW_WARNING_TOAST:
      return { ...state, toastMessage: action.payload, toastType: "warning" };
    default:
      return state;
  }
};
