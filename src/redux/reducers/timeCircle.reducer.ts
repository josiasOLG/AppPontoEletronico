import { SET_TIMECIRCLE_DATA, SET_BUTTON_STATUS, SET_STATUS_TEXT } from "../constants/actionTypes";

const initialState = {
  motoristaData: null,
  buttonEnabled: false,
  statusText: 'No Horário',
};

const timeCircleReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case SET_TIMECIRCLE_DATA:
      return {
        ...state,
        motoristaData: action.payload,
      };
    case SET_BUTTON_STATUS:
      return {
        ...state,
        buttonEnabled: action.payload,
      };
    case SET_STATUS_TEXT:
      return {
        ...state,
        statusText: action.payload,
      };
    default:
      return state;
  }
};

export default timeCircleReducer;
