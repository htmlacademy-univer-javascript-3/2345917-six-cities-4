import {NameSpace} from '../../components/constants/const';
import {State} from '../../components/types/state';
import { AuthorizationStatus } from '../../components/constants/status';

// eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
export const getAuthorizationStatus = (state: State): AuthorizationStatus => state[NameSpace.User].authorizationStatus;
export const getEmail = (state: State): string => state[NameSpace.User].email;
export const getAuthCheckedStatus = (state: State): boolean => state[NameSpace.User].authorizationStatus !== AuthorizationStatus.Unknown;
