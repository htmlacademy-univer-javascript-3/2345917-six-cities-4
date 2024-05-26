import Header from '../../../components/header/header';
import OfferList from '../../offer-list/offer-list';
import Map from '../../map/map';
import { useAppSelector } from '../../../hooks/index';
import CityList from '../../../components/cities-list/cities-list';
import SortingForm from '../../../components/sorting-form/sorting-form';

function MainScreen(): JSX.Element {
  const city = useAppSelector((state) => state.city);
  const offers = useAppSelector((state) => state.offers);
  const cityOffers = offers.filter((offer) => offer.city.name === city);
  return (
    <div className="page page--gray page--main">
      <Header />
      <main className="page__main page__main--index">
        <h1 className="visually-hidden">Cities</h1>
        <div className="tabs">
          <section className="locations container">
            <CityList chosenCity={city}/>
          </section>
        </div>
        <div className="cities">
          <div className="cities__places-container container">
            <section className="cities__places places">
              <h2 className="visually-hidden">Places</h2>
              <b className="places__found">{cityOffers.length} places to stay in {city}</b>
              <SortingForm />
              <OfferList offers={cityOffers} listType={'default'}/>
            </section>
            <div className="cities__right-section">
              <section className="cities__map map"><Map city={cityOffers[0].city} points={cityOffers.map((of) => of.location)}/></section>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default MainScreen;
