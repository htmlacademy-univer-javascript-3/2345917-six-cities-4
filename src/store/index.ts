import { redirect } from '../components/mildwares/redirect';
import {configureStore} from '@reduxjs/toolkit';
import { createAPI } from '../services/api';
import { rootReducer } from './../store/reducer-root';

export const api = createAPI();

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: {
        extraArgument: api,
      },
    }).concat(redirect),
});
