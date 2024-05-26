import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/app/app';
import { Provider } from 'react-redux';
import { store } from './store/index';
import { reviews } from './components/mocks/reviews';
import { fetchOffersAction } from './store/api-action';
import MessageError from './components/message-error/message-error';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

store.dispatch(fetchOffersAction());

root.render(
  <React.StrictMode>
    <Provider store = {store}>
      <MessageError/>
      <App
        reviews={reviews}
      />
    </Provider>
  </React.StrictMode>
);
