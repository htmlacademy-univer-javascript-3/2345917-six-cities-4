import { AppRoute } from '../components/constants/app-route';
import {createAction} from '@reduxjs/toolkit';

export const redirectToRoute = createAction<AppRoute>('offer/redirectToRoute');
