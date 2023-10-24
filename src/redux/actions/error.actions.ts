import { SHOW_ERROR_TOAST, SHOW_SUCCESS_TOAST, SHOW_WARNING_TOAST } from "../constants/errorTypes";

export const showSuccessToast = (title: string, subtitle?: string) => ({
  type: SHOW_SUCCESS_TOAST,
  payload: { title, subtitle },
});

export const showErrorToast = (title: string, subtitle?: string) => ({
  type: SHOW_ERROR_TOAST,
  payload: { title, subtitle },
});

export const showWarningToast = (title: string, subtitle?: string) => ({
  type: SHOW_WARNING_TOAST,
  payload: { title, subtitle },
});
