import { NameSpace } from '../../components/constants/const';
import { State } from '../../components/types/state';

// eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-return
export const getFavorites = (state: State): string[] => state[NameSpace.FavoriteProcess].favorites;
