import { Offer } from './offer';
import { OfferData } from './offer-data';
import { Review } from './review';

export type SelectedOffer = {
  offerData: OfferData;
  reviews: Review[];
  nearbyOffers: Offer[];
}
