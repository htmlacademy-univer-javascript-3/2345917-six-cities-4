import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { FavoriteProcess } from '../../components/types/state';
import { NameSpace } from '../../components/constants/const';

const initialState: FavoriteProcess = {
  favorites: []
};

export const favoriteProcess = createSlice({
  name: NameSpace.FavoriteProcess,
  initialState,
  reducers: {
    addFavorite: (state, action: PayloadAction<string[]>) => {
      state.favorites = action.payload;
    }
  },
});

export const {addFavorite} = favoriteProcess.actions;
