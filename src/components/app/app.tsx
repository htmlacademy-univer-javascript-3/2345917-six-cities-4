import browserHistory from '../../browser-history/browser-history';
import HistoryRouter from '../history-route/history-route';
import { store } from '../../store/index';
import MainScreen from '../pages/main-screen/main-screen';
import { Route, Routes } from 'react-router-dom';
import ErrorScreen from '../pages/error-screen/error-screen';
import FavoritesScreen from '../pages/favorites-screen/favorites-screen';
import LoginScreen from '../pages/login-screen/login-screen';
import OfferScreen from '../pages/offer-screen/offer-screen';
import { AppRoute } from '../../components/constants/app-route';
import PrivateRoute from '../pages/private-route/private-route';
import { useAppSelector } from '../../hooks/index';
import { getAuthCheckedStatus, getAuthorizationStatus } from '../../store/user-process/selector.ts';
import { getIsOfferDataLoading } from '../../store/offer-process/selector.ts';
import LoadingScreen from '../../components/pages/loading-screen/loading-screen';
import { fetchFavoritesAction } from '../../store/api-actions';
import { useEffect } from 'react';

function App(): JSX.Element {
  const isOffersDataLoading = useAppSelector(getIsOfferDataLoading);
  const authorizationStatus = useAppSelector(getAuthorizationStatus);
  const isAuthChecked = useAppSelector(getAuthCheckedStatus);
  useEffect(() => {
    store.dispatch(fetchFavoritesAction());
  }, [authorizationStatus]);
  if (!isAuthChecked || isOffersDataLoading) {
    return (
      <LoadingScreen />
    );
  }
  return (
    <HistoryRouter history={browserHistory}>
      <Routes>
        <Route
          path={AppRoute.Main}
          element={<MainScreen/>}
        />
        <Route
          path={AppRoute.Login}
          element={<LoginScreen/>}
        />
        <Route
          path={AppRoute.Favorites}
          element={
            <PrivateRoute>
              <FavoritesScreen/>
            </PrivateRoute>
          }
        />
        <Route
          path={AppRoute.Offer}
          element={<OfferScreen/>}
        />
        <Route
          path="*"
          element={<ErrorScreen/>}
        />
      </Routes>
    </HistoryRouter>
  );
}

export default App;
