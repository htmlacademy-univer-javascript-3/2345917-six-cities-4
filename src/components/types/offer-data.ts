import { Offer } from './offer';

type Host = {
  name: string;
  avatarUrl: string;
  isPro: boolean;
}

export type OfferData = Omit<Offer, 'previewImage'> & {
  description: string;
  bedrooms: number;
  goods: string[];
  host: Host;
  images: string[];
  maxAdults: number;
}
