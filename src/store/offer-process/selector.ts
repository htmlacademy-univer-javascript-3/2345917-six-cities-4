import { NameSpace } from '../../components/constants/const';
import { Point } from '../../components/types/point';
import { State } from '../../components/types/state';
import { Offer } from '../../components/types/offer';

// eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
export const getSortingType = (state: State): string => state[NameSpace.Offers].filterType;
export const getOffers = (state: State): Offer[] => state[NameSpace.Offers].offers;
export const getCity = (state: State): string => state[NameSpace.Offers].city;
export const getSelectedPoint = (state: State): undefined | Point => state[NameSpace.Offers].selectedPoint;
export const getIsOfferDataLoading = (state: State): boolean => state[NameSpace.Offers].isOffersDataLoading;
