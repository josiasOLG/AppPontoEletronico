import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from '../reducers/rootReducer';
import { toastMiddleware } from '../Middleware/toastMiddleware';

const configureStore = () => {
  return createStore(
    rootReducer,
    applyMiddleware(thunk, toastMiddleware)
  );
};

export default configureStore;
