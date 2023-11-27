import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from '../reducers/rootReducer';
import { toastMiddleware } from '../Middleware/toastMiddleware';
import { loadingMiddleware } from '../Middleware/loadingMiddleware';

const configureStore = () => {
  return createStore(
    rootReducer,
    applyMiddleware(thunk, toastMiddleware, loadingMiddleware)
  );
};

export default configureStore;
