import CityCard from '../../city-cards/city-cards';
import { useAppSelector } from '../../../hooks/index';
import Header from '../../../components/header/header';

function FavoritesScreen(): JSX.Element{
  const offers = useAppSelector((state) => state.offers);
  const favorites = useAppSelector((state) => state.favorites);
  const favoriteOffers = offers.filter((offer) => favorites.includes(offer.id));
  return (
    <div className ="page">
      <header className ="header">
        <div className ="container">
          <Header/>
        </div>
      </header>

      <main className ="page__main page__main--favorites">
        <div className ="page__favorites-container container">
          <section className ="favorites">
            <h1 className ="favorites__title">Saved listing</h1>
            <ul className ="favorites__list">
              <li className ="favorites__locations-items">
                <div className ="favorites__locations locations locations--current">
                  <div className ="locations__item">
                    <a className ="locations__item-link" href="#">
                      <span>Amsterdam</span>
                    </a>
                  </div>
                </div>
                <div className ="favorites__places">
                  {favoriteOffers.map((offer) =>
                    <CityCard key={offer.id} offer={offer} cardType='default'/>
                  )}
                </div>
              </li>
            </ul>
          </section>
        </div>
      </main>
      <footer className ="footer container">
        <a className ="footer__logo-link" href="main.html">
          <img className ="footer__logo" src="img/logo.svg" alt="6 cities logo" width="64" height="33"/>
        </a>
      </footer>
    </div>
  );
}

export default FavoritesScreen;
