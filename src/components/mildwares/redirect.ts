import { PayloadAction } from '@reduxjs/toolkit';
import browserHistory from '../../browser-history/browser-history';
import { Middleware } from 'redux';
import { rootReducer } from '../../store/reducer-root';

type Reducer = ReturnType<typeof rootReducer>;

export const redirect: Middleware<unknown, Reducer> =
  () =>
    (next) =>
      (action: PayloadAction<string>) => {
        if (action.type === 'offer/redirectToRoute') {
          browserHistory.push(action.payload);
        }

        return next(action);
      };
