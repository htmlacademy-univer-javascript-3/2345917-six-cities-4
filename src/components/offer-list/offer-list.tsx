import {Offer} from '../../components/types/offer';
import CityCard from '../city-cards/city-cards';

type OffersListProps = {
  offers: Offer[];
  pushActiveCard(id:number): void;
  isMainScreen: boolean;
};

function OffersList({ offers, pushActiveCard, isMainScreen }: OffersListProps) {
  return (
    <div className="cities__places-list places__list tabs__content">
      {offers.map((offer) =>
        <CityCard isMainScreen={isMainScreen} mouseCursor = {pushActiveCard} key={offer.id} offer={offer}/>)};
    </div>
  );
}

export default OffersList;
