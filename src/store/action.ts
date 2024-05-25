import {createAction} from '@reduxjs/toolkit';
import { City } from './../components/types/offer';

export const getOffers = createAction('offers/get');

export const changeCity = createAction('city/change', (value: City) => ({
  payload: value
}));
