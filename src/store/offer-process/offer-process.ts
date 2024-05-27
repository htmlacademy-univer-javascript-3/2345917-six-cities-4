import { Point } from '../../components/types/point';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { OfferProcess } from '../../components/types/state';
import { NameSpace, cities } from '../../components/constants/const';
import { fetchOffersAction } from '../api-actions';

const initialState: OfferProcess = {
  city: cities[0],
  offers: [],
  filterType: 'Popular',
  hasError: false,
  selectedPoint: undefined,
  isOffersDataLoading: false,
  isCommentPosting: false,
  isCommentRejected: false
};

export const offerProcess = createSlice({
  name: NameSpace.Offers,
  initialState,
  reducers: {
    changeCity: (state, action: PayloadAction<string>) => {
      state.city = action.payload;
    },
    changeSorting: (state, action: PayloadAction<string>) => {
      state.filterType = action.payload;
    },
    changeSelectedPoint: (state, action: PayloadAction<Point | undefined>) => {
      state.selectedPoint = action.payload;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchOffersAction.pending, (state) => {
        state.isOffersDataLoading = true;
        state.hasError = false;
      })
      .addCase(fetchOffersAction.fulfilled, (state, action) => {
        state.offers = action.payload;
        state.isOffersDataLoading = false;
      })
      .addCase(fetchOffersAction.rejected, (state) => {
        state.isOffersDataLoading = false;
        state.hasError = true;
      });
  }
});

export const { changeCity, changeSorting, changeSelectedPoint } = offerProcess.actions;
