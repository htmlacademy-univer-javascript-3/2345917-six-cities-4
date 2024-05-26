import {store} from '../store';
import {setError} from '../store/action';
import { clearErrorAction } from '../store/api-action';

export const processErrorHandle = (message: string): void => {
  const showMessage = store.getState().showMessage;
  if (showMessage) {
    store.dispatch(setError(message));
    store.dispatch(clearErrorAction());
  }
};
