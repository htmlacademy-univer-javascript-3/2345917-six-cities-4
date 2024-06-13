import Header from '../../../components/header/header';
import OfferList from '../../offer-list/offer-list';
import Map from '../../map/map';
import { useAppSelector } from '../../../hooks/index';
import CityList from '../../../components/cities-list/cities-list';
import SortingForm from '../../../components/sorting-form/sorting-form';
import OfferEmpty from '../../../components/offer-empty/offer-empty';
import { getCity, getOffers, getHasError } from '../../../store/offer-process/selector';

function MainScreen(): JSX.Element {
  const city = useAppSelector(getCity);
  const offers = useAppSelector(getOffers);
  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
  const cityOffers = offers.filter((offer) => offer.city.name === city);
  const hasError = useAppSelector(getHasError);
  return (
    <div className={`page page--gray page--main ${hasError || cityOffers.length === 0 ? 'page__main--index-empty' : ''}`}>
      <Header />
      <main className="page__main page__main--index">
        <h1 className="visually-hidden">Cities</h1>
        <div className="tabs">
          <section className="locations container">
            <CityList chosenCity={city}/>
          </section>
        </div>
        {hasError || cityOffers.length === 0 ? (
          <OfferEmpty />
        ) : (
          <div className="cities">
            <div className="cities__places-container container">
              <section className="cities__places places">
                <h2 className="visually-hidden">Places</h2>
                <b className="places__found">{cityOffers.length} places to stay in {city}</b>
                <SortingForm />
                <OfferList offers={cityOffers} listType={'default'} />
              </section>
              <div className="cities__right-section">
                <section className="cities__map map">
                  <Map points={cityOffers.map((of) => of.location)} city={cityOffers[0].city} />
                </section>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

export default MainScreen;
