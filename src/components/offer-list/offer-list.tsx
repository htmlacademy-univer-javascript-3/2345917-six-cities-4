import getSorting from '../constants/const';
import { useAppSelector } from '../../hooks/index';
import {Offer} from '../../components/types/offer';
import CityCard from '../city-cards/city-cards';

type OfferPropsList = {
  offers: Offer[] | undefined;
  listType: 'default' | 'near';
};

function CityCardList({offers, listType}: OfferPropsList): JSX.Element {
  const sortingType = useAppSelector((state) => state.sortingType);
  return (
    <div className={`${listType === 'default' ? 'cities__places-list places__list tabs__content' : 'near-places__list places__list'}`}>
      {getSorting(offers, sortingType)?.map((offer) => (
        <CityCard key={offer.id} offer={offer} cardType={listType}/>
      ))}
    </div>
  );
}

export default CityCardList;
