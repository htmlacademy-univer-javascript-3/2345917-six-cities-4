import {Review} from './review';

export type Offer = {
  id: string;
  previewImage: [string];
  title: string;
  reviews: Review [];
  city: City;
  description: string;
  isFavorite: boolean;
  isPremium: boolean;
  type: string;
  rating: number;
  numberOfBedrooms: number;
  maxNumberOfGuests: number;
  price: number;
  householdItems: string;
  autor: Autor;
};

export type City = {
  name: string;
  latitude: number;
  longitude: number;
  zoom: number;
}

export type Autor = {
  avatar: string;
  name: string;
  isPro: boolean;
};
