import MainScreen from '../pages/main-screen/main-screen';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import ErrorScreen from '../pages/error-screen/error-screen';
import FavotitesScreen from '../pages/favorites-screen/favorites-screen';
import LoginScreen from '../pages/login-screen/login-screen';
import OfferScreen from '../pages/offer-screen/offer-screen';
import { Status } from '../constants/status';
import { Direction } from '../constants/direction';
import PrivateRoute from '../pages/private-route/private-route';
import { Offer } from '../types/offer';
import { Review } from '../types/review';

type AppScreenProps = {
  placesCount: number;
  offers: Offer[];
  reviews: Review[];
}

function App({placesCount, offers, reviews}: AppScreenProps): JSX.Element {
  const favorites = offers.filter((o) => o.isFavorite);
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path={Direction.Main}
          element={<MainScreen placesCount={placesCount} offers={offers}/>}
        />
        <Route
          path={Direction.Login}
          element={<LoginScreen/>}
        />
        <Route
          path={Direction.Favorites}
          element={
            <PrivateRoute
              authorizationStatus={Status.Authorization}
            >
              <FavotitesScreen offers ={favorites}/>
            </PrivateRoute>
          }
        />
        <Route
          path={Direction.Offer}
          element={<OfferScreen reviews={reviews}/>}
        />
        <Route
          path="*"
          element={<ErrorScreen/>}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
