import browserHistory from '../../browser-history/browser-history';
import HistoryRouter from '../history-route/history-route';
import { store } from '../../store/index';
import MainScreen from '../pages/main-screen/main-screen';
import { Route, Routes } from 'react-router-dom';
import ErrorScreen from '../pages/error-screen/error-screen';
import FavoritesScreen from '../pages/favorites-screen/favorites-screen';
import LoginScreen from '../pages/login-screen/login-screen';
import OfferScreen from '../pages/offer-screen/offer-screen';
import { AuthorizationStatus } from '../constants/status';
import { AppRoute } from '../../components/constants/app-route';
import PrivateRoute from '../pages/private-route/private-route';
import { Review } from '../types/review';
import { useAppSelector } from '../../hooks/index';
import LoadingScreen from '../../components/pages/loading-screen/loading-screen';
import { fetchFavoritesAction } from '../../store/api-action';

type AppScreenProps = {
  reviews: Review[];
}

function App({reviews }: AppScreenProps): JSX.Element {
  const isOffersDataLoading = useAppSelector((state) => state.isOffersDataLoading);
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const statusOfAuthorization = useAppSelector((state) => state.statusOfAuthorization);
  if (statusOfAuthorization === AuthorizationStatus.Authorization) {
    store.dispatch(fetchFavoritesAction());
  }
  if (statusOfAuthorization === AuthorizationStatus.Unknown || isOffersDataLoading) {
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
          element={<OfferScreen reviews={reviews}/>}
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
