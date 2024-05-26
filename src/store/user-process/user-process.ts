import { createSlice } from '@reduxjs/toolkit';
import { AuthorizationStatus } from '../../components/constants/status';
import { checkAuthAction, loginAction, logoutAction } from '../api-actions';
import { UserProcess } from '../../components/types/state';
import { NameSpace } from '../../components/constants/const';

const initialState: UserProcess = {
  authorizationStatus: AuthorizationStatus.Unknown,
  email: ''
};

export const userProcess = createSlice({
  name: NameSpace.User,
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(checkAuthAction.fulfilled, (state, action) => {
        state.authorizationStatus = AuthorizationStatus.Authorization;
        state.email = action.payload.email;
      })
      .addCase(checkAuthAction.rejected, (state) => {
        state.authorizationStatus = AuthorizationStatus.NoAuthorization;
      })
      .addCase(loginAction.fulfilled, (state, action) => {
        state.authorizationStatus = AuthorizationStatus.Authorization;
        state.email = action.payload.email;
      })
      .addCase(loginAction.rejected, (state) => {
        state.authorizationStatus = AuthorizationStatus.NoAuthorization;
      })
      .addCase(logoutAction.fulfilled, (state) => {
        state.authorizationStatus = AuthorizationStatus.NoAuthorization;
      });
  }
});
