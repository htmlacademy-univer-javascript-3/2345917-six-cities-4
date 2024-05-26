import {store} from '../../store/index';
import { AuthorizationStatus } from '../../components/constants/status.js';
import { Offer } from './offer.js';
import { Point } from './point.js';
import { SelectedOffer } from './selected-offer.js';

export type ErrorProcess = {
  error: null | string;
}

export type FavoriteProcess = {
  favorites: string[];
}

export type OfferProcess = {
  city: string;
  offers: Offer[];
  filterType: string;
  selectedPoint: Point | undefined;
  isOffersDataLoading: boolean;
}

export type SelectedOfferProcess = {
  selectedOffer: SelectedOffer | undefined;
  isSelectedOfferDataLoading: boolean;
}

export type UserProcess = {
  authorizationStatus: AuthorizationStatus;
  email: string;
};

export type State = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
