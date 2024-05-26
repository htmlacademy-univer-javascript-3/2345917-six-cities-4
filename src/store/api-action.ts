import { createAsyncThunk } from '@reduxjs/toolkit';
import { AppDispatch, State } from '../components/types/state';
import { AxiosInstance } from 'axios';
import { Offer } from '../components/types/offer';
import { loadOffers, setError, setOffersDataLoadingStatus } from './action';
import { store } from '.';
import { TIMEOUT_SHOW_ERROR } from '../components/constants/const';

export const clearErrorAction = createAsyncThunk(
  'offer/clearError',
  () => {
    setTimeout(
      () => store.dispatch(setError(null)),
      TIMEOUT_SHOW_ERROR,
    );
  },
);

export const fetchOffersAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'data/fetchOffers',
  async (_arg, {dispatch, extra: api}) => {
    dispatch(setOffersDataLoadingStatus(true));
    const {data} = await api.get<Offer[]>('/offers');
    dispatch(setOffersDataLoadingStatus(false));
    dispatch(loadOffers(data));
  }
);
