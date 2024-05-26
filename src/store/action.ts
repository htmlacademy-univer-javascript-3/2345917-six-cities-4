import {createAction} from '@reduxjs/toolkit';
import { Offer } from './../components/types/offer';
import { Point } from '../components/types/point';

export const changeCity = createAction('city/change', (value: string) => ({
  payload: value
}));

export const changeSorting = createAction('sorting/change', (value: string) => ({
  payload: value
}));

export const changeSelectedPoint = createAction('selectedPoint/change', (value: Point | undefined) => ({
  payload: value
}));

export const loadOffers = createAction<Offer[]>('data/loadOffers');

export const setOffersDataLoadingStatus = createAction<boolean>('data/setOffersDataLoadingStatus');

export const setError = createAction<string | null>('offer/setError');
