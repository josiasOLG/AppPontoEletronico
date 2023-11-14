import { combineReducers } from 'redux';
import loginReducer from './loginReducer';
import { errorReducer } from './error.reducer';
import motoristaReducer from './motoristaReducer';
import timeCircleReducer from './timeCircle.reducer';

const rootReducer = combineReducers({
  login: loginReducer,
  error: errorReducer,
  motorista: motoristaReducer,
  timeCircle: timeCircleReducer
});

export default rootReducer;
