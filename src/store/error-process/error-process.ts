import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { ErrorProcess } from '../../components/types/state';
import { NameSpace } from '../../components/constants/const';

const initialState: ErrorProcess = {
  error: null
};

export const errorProcess = createSlice({
  name: NameSpace.Error,
  initialState,
  reducers: {
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
  }
});

export const { setError } = errorProcess.actions;
