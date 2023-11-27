import { Middleware } from 'redux';
import { showLoading, hideLoading } from '../actions/loadingActions';
// Importe outros tipos de ações conforme necessário

export const loadingMiddleware: Middleware = store => next => action => {
  // Exemplo: substitua com suas próprias ações de início/fim de operação assíncrona
  if (action.type === 'ASYNC_OPERATION_START') {
    store.dispatch(showLoading());
  }

  if (action.type === 'ASYNC_OPERATION_END') {
    store.dispatch(hideLoading());
  }

  return next(action);
};
