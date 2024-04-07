import {Review} from './review';

export type Offer = {
  id: string;
  previewImage: [string];
  title: string;
  reviews: Review [];
  city: City;
  isFavorite: boolean;
  isPremium: boolean;
  type: string;
  rating: number;
  numberOfBedrooms: number;
  maxNumberOfQuests: number;
  price: number;
  householdItems: string;
  autor: Autor;
};

export type City = {
  name: string;
}

export type Autor = {
  avatar: string;
  name: string;
  isPro: boolean;
};