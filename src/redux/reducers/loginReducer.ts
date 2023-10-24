import { LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILURE, LOGOUT } from '../constants/actionTypes';

// Defina a interface para o estado inicial
interface InitialState {
  isLoading: boolean;
  isAuthenticated: boolean;
  userData: null | UserData;
  error: null | string;
}

interface UserData {
  id: number;
  name: string;
  email: string;
}

type ActionTypes = 
  | { type: typeof LOGIN_REQUEST }
  | { type: typeof LOGIN_SUCCESS; payload: UserData }
  | { type: typeof LOGIN_FAILURE; payload: string }
  | { type: typeof LOGOUT };

const initialState: InitialState = {
  isLoading: false,
  isAuthenticated: false,
  userData: null,
  error: null,
};

const loginReducer = (state = initialState, action: ActionTypes): InitialState => {
  switch (action.type) {
    case LOGIN_REQUEST:
      return {
        ...state,
        isLoading: true,
      };
    case LOGIN_SUCCESS:
      return {
        ...state,
        isLoading: false,
        isAuthenticated: true,
        userData: action.payload,
      };
    case LOGIN_FAILURE:
      return {
        ...state,
        isLoading: false,
        isAuthenticated: false,
        error: action.payload,
      };
    case LOGOUT:
      return {
        ...state,
        isAuthenticated: false,
        userData: null,
      };
    default:
      return state;
  }
};

export default loginReducer;
