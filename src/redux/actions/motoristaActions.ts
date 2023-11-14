// motoristaActions.ts

import { SET_MOTORISTA_DATA } from "../constants/actionTypes";

export const setMotoristaData = (data: any) => {
  return {
    type: SET_MOTORISTA_DATA,
    payload: data,
  };
};
