// motoristaReducer.ts

import { SET_MOTORISTA_DATA } from "../constants/actionTypes";

const initialState = {
  motoristaData: null,
};

const motoristaReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case SET_MOTORISTA_DATA:
      return {
        ...state,
        motoristaData: action.payload,
      };
    default:
      return state;
  }
};

export default motoristaReducer;
