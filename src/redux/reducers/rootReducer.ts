import { combineReducers } from 'redux';
import loginReducer from './loginReducer';
import { errorReducer } from './error.reducer';
import motoristaReducer from './motoristaReducer';
import timeCircleReducer from './timeCircle.reducer';
import { loadingReducer } from './loadingReducer';

const rootReducer = combineReducers({
  login: loginReducer,
  error: errorReducer,
  motorista: motoristaReducer,
  timeCircle: timeCircleReducer,
  loading: loadingReducer,
});

export default rootReducer;
