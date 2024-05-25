import {Offer} from '../types/offer';
import CityCard from '../city-cards/city-cards';

type CityCardsListProps = {
  offers: Offer[];
};

function CityCardsList({offers}: CityCardsListProps): JSX.Element {
  return (
    <div className="cities__places-list places__list tabs__content">
      {offers.map((offer) => (
        <CityCard key={offer.id} offer={offer}/>
      ))}
    </div>
  );
}

export default CityCardsList;
