import { HIDE_LOADING, SHOW_LOADING } from "../constants/actionTypes";

interface LoadingState {
  isLoading: boolean;
}

const initialState: LoadingState = {
  isLoading: false,
};

export const loadingReducer = (state = initialState, action): LoadingState => {
  switch (action.type) {
    case SHOW_LOADING:
      return { ...state, isLoading: true };
    case HIDE_LOADING:
      return { ...state, isLoading: false };
    default:
      return state;
  }
};
