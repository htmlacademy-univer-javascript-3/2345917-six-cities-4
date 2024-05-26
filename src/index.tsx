import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/app/app';
import { Provider } from 'react-redux';
import { store } from './store/index';
import { fetchOffersAction, checkAuthAction } from './store/api-actions';
import MessageError from './components/message-error/message-error';

store.dispatch(checkAuthAction());
store.dispatch(fetchOffersAction());

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <Provider store = {store}>
      <MessageError/>
      <App/>
    </Provider>
  </React.StrictMode>
);
