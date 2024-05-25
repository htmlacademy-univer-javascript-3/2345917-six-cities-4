import MainScreen from '../pages/main-screen/main-screen';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import ErrorScreen from '../pages/error-screen/error-screen';
import FavoritesScreen from '../pages/favorites-screen/favorites-screen';
import LoginScreen from '../pages/login-screen/login-screen';
import OfferScreen from '../pages/offer-screen/offer-screen';
import { Status } from '../constants/status';
import { Direction } from '../constants/direction';
import PrivateRoute from '../pages/private-route/private-route';
import { Review } from '../types/review';

type AppScreenProps = {
  reviews: Review[];
}

function App({reviews }: AppScreenProps): JSX.Element {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path={Direction.Main}
          element={<MainScreen/>}
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
              <FavoritesScreen/>
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
