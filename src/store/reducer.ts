import {createReducer} from '@reduxjs/toolkit';
import { Offer, City} from './../components/types/offer';
import { cities } from './../components/mocks/cities';
import { offers } from './../components/mocks/offers';
import { changeCity, getOffers, changeSorting, changeSelectedPoint } from '../store/action';
import { Point } from '../components/types/point';

type StateType = {
  city: City;
  offers: Offer[];
  sortingType: string;
  selectedPoint: Point | undefined;
}

const initialState: StateType = {
  city: cities[0],
  offers: offers,
  sortingType: 'Popular',
  selectedPoint: undefined
};

const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(getOffers, (state) => {
      state.offers = offers;
    })
    .addCase(changeCity, (state, action) => {
      state.city = action.payload;
    })
    .addCase(changeSorting, (state, action) => {
      state.sortingType = action.payload;
    })
    .addCase(changeSelectedPoint, (state, action) => {
      state.selectedPoint = action.payload;
    });
});

export {reducer};
