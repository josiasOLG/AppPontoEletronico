import { Middleware } from 'redux';
import Toast from 'react-native-toast-message';
import { SHOW_ERROR_TOAST, SHOW_SUCCESS_TOAST, SHOW_WARNING_TOAST } from '../constants/errorTypes';

export const toastMiddleware: Middleware = store => next => action => {
  switch(action.type) {
    case SHOW_SUCCESS_TOAST:
      Toast.show({
        type: 'success',
        text1: action.payload.title,
        text2: action.payload.subtitle
      });
      break;

    case SHOW_ERROR_TOAST:
      Toast.show({
        type: 'error',
        text1: action.payload.title,
        text2: action.payload.subtitle
      });
      break;

    case SHOW_WARNING_TOAST:
      Toast.show({
        type: 'warning',
        text1: action.payload.title,
        text2: action.payload.subtitle
      });
      break;

    default:
      break;
  }

  return next(action);
};
