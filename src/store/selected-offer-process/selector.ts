import { NameSpace } from '../../components/constants/const';
import { SelectedOffer } from '../../components/types/selected-offer';
import { State } from '../../components/types/state';

// eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
export const getSelectedOffer = (state: State): SelectedOffer | undefined => state[NameSpace.SelectedOffer].selectedOffer;
export const getisSelectedOfferDataLoading = (state: State): boolean => state[NameSpace.SelectedOffer].isSelectedOfferDataLoading;
export const getIsCommentPosting = (state: State): boolean => state[NameSpace.SelectedOffer].isCommentPosting;
export const getIsCommentRejected = (state: State): boolean => state[NameSpace.SelectedOffer].isCommentRejected;
