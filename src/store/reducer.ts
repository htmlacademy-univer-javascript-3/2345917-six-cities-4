import {createReducer} from '@reduxjs/toolkit';
import { Offer } from './../components/types/offer';
import { cities } from '../components/constants/const';
import { changeCity, changeSorting, changeSelectedPoint, loadOffers, setError, setOffersDataLoadingStatus } from '../store/action';
import { Point } from '../components/types/point';

type StateType = {
  isOffersDataLoading: boolean;
  error: string | null;
  city: string;
  offers: Offer[];
  sortingType: string;
  selectedPoint: Point | undefined;
}

const initialState: StateType = {
  isOffersDataLoading: false,
  error: null,
  city: cities[0],
  offers: [],
  sortingType: 'Popular',
  selectedPoint: undefined
};

const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(changeCity, (state, action) => {
      state.city = action.payload;
    })
    .addCase(changeSorting, (state, action) => {
      state.sortingType = action.payload;
    })
    .addCase(changeSelectedPoint, (state, action) => {
      state.selectedPoint = action.payload;
    })
    .addCase(loadOffers, (state, action) => {
      state.offers = action.payload;
    })
    .addCase(setOffersDataLoadingStatus, (state, action) => {
      state.isOffersDataLoading = action.payload;
    })
    .addCase(setError, (state, action) => {
      state.error = action.payload;
    });
});

export {reducer};
