import { combineReducers } from 'redux';
import loginReducer from './loginReducer';
import { errorReducer } from './error.reducer';

const rootReducer = combineReducers({
  login: loginReducer,
  error: errorReducer,
});

export default rootReducer;
