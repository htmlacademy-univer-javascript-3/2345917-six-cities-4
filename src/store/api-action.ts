import { APIRoute } from '../components/constants/const';
import { AuthorizationStatus } from '../components/constants/status';
import { UserInfo } from '../components/types/user-info';
import { dropToken, saveToken } from '../services/token';
import { AuthInfo } from '../components/types/auth-info';
import { Direction } from '../components/constants/direction';
import { FavoriteInfo } from '../components/types/favorite-info';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { AppDispatch, State } from '../components/types/state';
import { AxiosInstance } from 'axios';
import { Offer } from '../components/types/offer';
import { loadOffers, setError, setOffersDataLoadingStatus, addFavorite, redirectToRoute, requireAuthorization, saveEmail, showMessageInitial } from './action';
import { store } from '.';
import { TIMEOUT_SHOW_ERROR } from '../components/constants/const';

export const clearErrorAction = createAsyncThunk(
  'offer/clearError',
  () => {
    setTimeout(
      () => store.dispatch(setError(null)),
      TIMEOUT_SHOW_ERROR
    );
  },
);

export const fetchOffersAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'fetchOffers',
  async (_, { dispatch, extra: api }) => {
    dispatch(setOffersDataLoadingStatus(true));
    try {
      const response = await api.get<Offer[]>(APIRoute.Offers);
      dispatch(loadOffers(response.data));
    } finally {
      dispatch(setOffersDataLoadingStatus(false));
    }
  }
);

export const checkAuthAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'user/checkAuth',
  async (_arg, { dispatch, extra: api }) => {
    dispatch(showMessageInitial(false));
    try {
      const { data } = await api.get<UserInfo>(APIRoute.Login);
      dispatch(requireAuthorization(AuthorizationStatus.Authorization));
      dispatch(saveEmail(data.email));
    } catch {
      dispatch(requireAuthorization(AuthorizationStatus.NoAuthorization));
    }
    dispatch(showMessageInitial(true));
  },
);

export const loginAction = createAsyncThunk<
  void,
  AuthInfo,
  {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }
>('user/login', async ({ email, password }, { dispatch, extra: api }) => {
  const {
    data: { token },
  } = await api.post<UserInfo>(APIRoute.Login, { email, password });
  saveToken(token);
  dispatch(requireAuthorization(AuthorizationStatus.Authorization));
  dispatch(saveEmail(email));
  dispatch(redirectToRoute(Direction.Main));
},
);

export const logoutAction = createAsyncThunk<
  void,
  undefined,
  {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }
>('user/logout', async (_arg, { dispatch, extra: api }) => {
  await api.delete(APIRoute.Logout);
  dropToken();
  dispatch(requireAuthorization(AuthorizationStatus.NoAuthorization));
  dispatch(redirectToRoute(Direction.Main));
  dispatch(addFavorite([]));
},
);

export const changeFavorite = createAsyncThunk<void, FavoriteInfo, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'favorite/add',
  async ({ offerId, status, favorites }, { dispatch, extra: api }) => {
    const { data: { id } } = await api.post<Offer>(`${APIRoute.Favorite}/${offerId}/${status}`);
    if (status === 1) {
      dispatch(addFavorite(favorites.concat(id)));
    } else {
      dispatch(addFavorite(favorites.filter((offId) => offId !== offerId)));
    }
  },
);

export const fetchFavoritesAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'data/fetchFavorites',
  async (_arg, { dispatch, extra: api }) => {
    const { data } = await api.get<Offer[]>(APIRoute.Favorite);
    dispatch(addFavorite(data.map((offer) => offer.id)));
  }
);
