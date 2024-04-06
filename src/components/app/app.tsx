import MainScreen from '../pages/main-screen/main-screen';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import ErrorScreen from '../pages/error-screen/error-screen';
import FavotitesScreen from '../pages/favorites-screen/favorites-screen';
import LoginScreen from '../pages/login-screen/login-screen';
import NotLoggedOfferScreen from '../pages/not-logged-offer-screen//not-logged-offer-screen';
import OfferScreen from '../pages/offer-screen/offer-screen';
import { Status } from '../constants/status';
import { Direction } from '../constants/direction';
import PrivateRoute from '../pages/private-route/private-route';

type AppScreenProps = {
  placesCount: number;
}

function App({placesCount}: AppScreenProps): JSX.Element {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path={Direction.Main}
          element={<MainScreen placesCount={placesCount}/>}
        />
        <Route
          path={Direction.Login}
          element={<LoginScreen/>}
        />
        <Route
          path={Direction.Favorites}
          element={
            <PrivateRoute
              authorizationStatus={Status.NoAuthorization}
            >
              <FavotitesScreen/>
            </PrivateRoute>
          }
        />
        <Route
          path={Direction.Offer}
          element={<OfferScreen/>}
        />
        <Route
          path={Direction.Offer}
          element={<NotLoggedOfferScreen/>}
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
