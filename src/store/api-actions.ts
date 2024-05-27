import { APIRoute } from '../components/constants/const';
import { UserInfo } from '../components/types/user-info';
import { dropToken, saveToken } from '../services/token';
import { AuthInfo } from '../components/types/auth-info';
import { AppRoute } from '../components/constants/app-route';
import { FavoriteInfo } from '../components/types/favorite-info';
import { AppDispatch, State } from '../components/types/state';
import { AxiosInstance } from 'axios';
import { redirectToRoute } from './action';
import { Offer } from '../components/types/offer';
import { SelectedOffer } from './../components/types/selected-offer';
import { addFavorite, addFavoriteOffers } from './../store/favorite-process/favorite-process';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { setError } from './../store/error-process/error-process';
import { TIMEOUT_SHOW_ERROR } from '../components/constants/const';
import { OfferData } from './../components/types/offer-data';
import { Review } from './../components/types/review';
import { CommentData } from './../components/types/comment-data';

export const fetchOffersAction = createAsyncThunk<Offer[], undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'fetchOffers',
  async (_arg, { extra: api }) => {
    const { data } = await api.get<Offer[]>(APIRoute.Offers);
    return data;
  }
);

export const checkAuthAction = createAsyncThunk<UserInfo, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'user/checkAuth',
  async (_arg, { extra: api }) => {
    const { data } = await api.get<UserInfo>(APIRoute.Login);
    return data;
  },
);

export const loginAction = createAsyncThunk<UserInfo, AuthInfo, {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }
>('user/login', async ({ email, password }, { dispatch, extra: api }) => {
  const { data } = await api.post<UserInfo>(APIRoute.Login, { email, password });
  saveToken(data.token);
  dispatch(redirectToRoute(AppRoute.Main));
  return data;
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
  await api.delete(AppRoute.Login);
  dropToken();
  dispatch(redirectToRoute(AppRoute.Main));
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
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
    dispatch(addFavoriteOffers(data));
  }
);

export const fetchOfferAction = createAsyncThunk<SelectedOffer, string, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'offer/fetchOffer',
  async (id, { extra: api }) => {
    const { data: offerData } = await api.get<OfferData>(`${APIRoute.Offers}/${id}`);
    const { data: reviews } = await api.get<Review[]>(`${APIRoute.Comments}/${id}`);
    const { data: nearbyOffers } = await api.get<Offer[]>(`${APIRoute.Offers}/${id}/nearby`);
    return { offerData, reviews, nearbyOffers };
  }
);

export const postComment = createAsyncThunk<Review[], CommentData, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'comment/post',
  async ({ comment, offerId, rating }, { extra: api }) => {
    await api.post(`${APIRoute.Comments}/${offerId}`, { comment, rating });
    const { data: reviews } = await api.get<Review[]>(`${APIRoute.Comments}/${offerId}`);
    return reviews;
  },
);

export const clearErrorAction = createAsyncThunk(
  'offer/clearError',
  (_, { dispatch }) => {
    setTimeout(() => {
      dispatch(setError(null));
    },
    TIMEOUT_SHOW_ERROR,
    );
  }
);
