import { useAppSelector, useAppDispatch } from '../../hooks';
import { getFavorites } from '../../store/favorite-process/selector';
import { getOffers } from '../../store/offer-process/selector';
import OfferCard from '../offer-cards/offer-cards';
import { redirectToRoute } from '../../store/action';
import { changeCity } from '../../store/offer-process/offer-process';
import { AppRoute } from '../constants/app-route';

function FavoritesList(): JSX.Element {
  const offers = useAppSelector(getOffers);
  const favorites = useAppSelector(getFavorites);
  const favoriteOffers = offers.filter((offer) => favorites.includes(offer.id));
  const favoriteOffersCitiesSet = new Set(favoriteOffers.map((of) => of.city.name));
  const favoriteOffersCities = Array.from(favoriteOffersCitiesSet);
  const dispatch = useAppDispatch();
  const clickCityHandle = (city: string) => {
    dispatch(changeCity(city));
    dispatch(redirectToRoute(AppRoute.Main));
  };
  return (
    <ul className="favorites__list">
      {favoriteOffersCities.map((city) => (
        <li className="favorites__locations-items" key={city}>
          <div className="favorites__locations locations locations--current">
            <div className="locations__item">
              <a className="locations__item-link" onClick={() => clickCityHandle(city)}>
                <span>{city}</span>
              </a>
            </div>
          </div>
          <div className="favorites__places">
            {favoriteOffers.filter((of) => of.city.name === city).map((offer) =>
              <OfferCard key={offer.id} offer={offer} cardType='favorite' />
            )}
          </div>
        </li>
      ))}

    </ul>
  );
}

export default FavoritesList;
