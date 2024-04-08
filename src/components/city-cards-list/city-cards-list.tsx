import {Offer} from '../types/offer';
import CityCard from '../city-cards/city-cards';

type CityCardsListProps = {
  offers: Offer[];
  pushActiveCard(id:number): void;
  isMainScreen: boolean;
};

function CityCardsList({offers, pushActiveCard, isMainScreen}: CityCardsListProps): JSX.Element {
  return (
    <div className="cities__places-list places__list tabs__content">
      {offers.map((offer) =>
        <CityCard isMainScreen = {isMainScreen} mouseCursor = {pushActiveCard} key={offer.id} offer={offer}/>
      )};
    </div>
  );
}

export default CityCardsList;
