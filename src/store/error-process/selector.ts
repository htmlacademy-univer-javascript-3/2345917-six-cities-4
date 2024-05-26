import { NameSpace } from '../../components/constants/const';
import { State } from '../../components/types/state';

// eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
export const getError = (state: State): string | null => state[NameSpace.Error].error;
