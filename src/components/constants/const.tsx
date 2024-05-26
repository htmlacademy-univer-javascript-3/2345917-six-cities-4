import { Offer } from './../types/offer';

export const cities = ['Paris', 'Cologne', 'Brussels', 'Amsterdam', 'Hamburg', 'Dusseldorf'];

const getSorting = (offers: Offer[], sortingType: string): Offer[] | undefined => {
  const defaultOffers = offers.slice();
  switch (sortingType) {
    case 'Popular':
      return offers;
    case 'Price: low to high':
      return defaultOffers.sort((a, b) => a.price - b.price);
    case 'Price: high to low':
      return defaultOffers.sort((a, b) => b.price - a.price);
    case 'Top rated first':
      return defaultOffers.sort((a, b) => b.rating - a.rating);
  }
};

export default getSorting;

export const TIMEOUT_SHOW_ERROR = 2000;

export enum APIRoute {
  Offers = '/offers',
  Login = '/login',
  Logout = '/logout',
  Favorite = '/favorite'
}
