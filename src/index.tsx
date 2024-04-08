import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/app/app';
import {Settings} from './components/constants/const';
import {offers} from './components/mocks/offers';
import { reviews } from './components/mocks/reviews';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <App placesCount={Settings.placesCount}offers={offers} reviews={reviews}/>
  </React.StrictMode>
);
