import { memo, useMemo } from 'react';
import {getSorting} from '../constants/const';
import { getSortingType } from '../../store/offer-process/selector';
import { useAppSelector } from '../../hooks/index';
import {Offer} from '../../components/types/offer';
import CityCard from '../city-cards/city-cards';

type OfferPropsList = {
  offers: Offer[] | undefined;
  listType: 'default' | 'near';
};

function CityCardListComponent({offers, listType}: OfferPropsList): JSX.Element {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  const sortingType = useAppSelector(getSortingType);
  return (
    <div className={`${listType === 'default' ? 'cities__places-list places__list tabs__content' : 'near-places__list places__list'}`}>
      {useMemo(() => getSorting(offers, sortingType), [offers, sortingType])?.map((offer) => (
        <CityCard key={offer.id} offer={offer} cardType={listType}/>
      ))}
    </div>
  );
}

const CityCardList = memo(CityCardListComponent);
export default CityCardList;
