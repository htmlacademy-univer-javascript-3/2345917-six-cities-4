import { NameSpace } from '../../components/constants/const';
import { State } from '../../components/types/state';
import { Offer } from '../../components/types/offer';

// eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-return
export const getFavorites = (state: State): string[] => state[NameSpace.FavoriteProcess].favorites;
export const getFetchedFavorites = (state: State): Offer[] => state[NameSpace.FavoriteProcess].fetchedFavorites;
export const getIsFavoriteLoading = (state: State): boolean => state[NameSpace.FavoriteProcess].isFavoriteLoading;
