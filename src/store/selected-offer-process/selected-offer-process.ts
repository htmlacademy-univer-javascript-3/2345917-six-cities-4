import { fetchOfferAction, postComment } from '../api-actions';
import { createSlice } from '@reduxjs/toolkit';
import { SelectedOfferProcess } from '../../components/types/state';
import { NameSpace } from '../../components/constants/const';

const initialState: SelectedOfferProcess = {
  selectedOffer: undefined,
  isSelectedOfferDataLoading: false,
};

export const selectedOfferProcess = createSlice({
  name: NameSpace.SelectedOffer,
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchOfferAction.pending, (state) => {
        state.isSelectedOfferDataLoading = true;
      })
      .addCase(fetchOfferAction.fulfilled, (state, action) => {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        state.selectedOffer = action.payload;
        state.isSelectedOfferDataLoading = false;
      })
      .addCase(fetchOfferAction.rejected, (state) => {
        state.isSelectedOfferDataLoading = false;
      })
      .addCase(postComment.fulfilled, (state, action) => {
        state.selectedOffer!.reviews = action.payload;
      });
  }
});
