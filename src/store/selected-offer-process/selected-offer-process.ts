import { fetchOfferAction, postComment } from '../api-actions';
import { createSlice } from '@reduxjs/toolkit';
import { SelectedOfferProcess } from '../../components/types/state';
import { NameSpace } from '../../components/constants/const';

const initialState: SelectedOfferProcess = {
  isCommentPosting: false,
  isCommentRejected: false,
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
        state.isCommentPosting = false;
        state.isCommentRejected = false;
      })
      .addCase(postComment.pending, (state) => {
        state.isCommentPosting = true;
        state.isCommentRejected = true;
      })
      .addCase(postComment.rejected, (state) => {
        state.isCommentRejected = true;
        state.isCommentPosting = false;
      });
  }
});
