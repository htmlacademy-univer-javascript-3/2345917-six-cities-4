import {createAction} from '@reduxjs/toolkit';
import { City } from './../components/types/offer';
import { Point } from '../components/types/point';

export const getOffers = createAction('offers/get');

export const changeCity = createAction('city/change', (value: City) => ({
  payload: value
}));

export const changeSorting = createAction('sorting/change', (value: string) => ({
  payload: value
}));

export const changeSelectedPoint = createAction('selectedPoint/change', (value: Point | undefined) => ({
  payload: value
}));
