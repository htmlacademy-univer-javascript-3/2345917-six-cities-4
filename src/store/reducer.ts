import { AuthorizationStatus } from '../components/constants/status';
import {createReducer} from '@reduxjs/toolkit';
import { Offer } from './../components/types/offer';
import { cities } from '../components/constants/const';
import { changeCity, changeSorting, changeSelectedPoint, loadOffers, setError, setOffersDataLoadingStatus, addFavorite, requireAuthorization, saveEmail, showMessageInitial, loadSelectedOffer, loadSelectedOfferComments, setSelectedOfferDataLoadingStatus} from '../store/action';
import { Point } from '../components/types/point';
import { SelectedOffer } from './../components/types/selected-offer';

type StateType = {
  statusOfAuthorization: unknown;
  authorizationStatus: AuthorizationStatus;
  email: string;
  isOffersDataLoading: boolean;
  error: string | null;
  city: string;
  offers: Offer[];
  sortingType: string;
  selectedPoint: Point | undefined;
  favorites: string[];
  showMessage: boolean;
  selectedOfferId: string;
  selectedOffer: SelectedOffer | undefined;
  isSelectedOfferDataLoading: boolean;
}

const initialState: StateType = {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
  authorizationStatus: AuthorizationStatus.Unknown,
  email: '',
  isOffersDataLoading: false,
  error: null,
  city: cities[0],
  offers: [],
  sortingType: 'Popular',
  selectedPoint: undefined,
  favorites: [],
  showMessage: true,
  selectedOfferId: '',
  selectedOffer: undefined,
  isSelectedOfferDataLoading: false,
  statusOfAuthorization: undefined
};

const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(requireAuthorization, (state, action) => {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
      state.authorizationStatus = action.payload;
    })
    .addCase(saveEmail, (state, action) => {
      state.email = action.payload;
    })
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
    })
    .addCase(addFavorite, (state, action) => {
      state.favorites = action.payload;
    })
    .addCase(showMessageInitial, (state, action) => {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
      state.showMessage = action.payload;
    })
    .addCase(loadSelectedOffer, (state, action) => {
      state.selectedOffer = action.payload;
    })
    .addCase(setSelectedOfferDataLoadingStatus, (state, action) => {
      state.isSelectedOfferDataLoading = action.payload;
    })
    .addCase(loadSelectedOfferComments, (state, action) => {
      state.selectedOffer!.reviews = action.payload;
    });
});

export {reducer};
