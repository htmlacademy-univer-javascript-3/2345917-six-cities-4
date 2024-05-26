import { Point } from './point';

export type Offer = {
  location: Point;
  id: string;
  previewImage: string;
  title: string;
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
  location: {
    latitude: number;
    longitude: number;
    zoom: number;
  };
}

export type Autor = {
  avatar: string;
  name: string;
  isPro: boolean;
};
