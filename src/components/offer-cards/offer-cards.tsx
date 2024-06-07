import { memo } from 'react';
import { Offer } from '../types/offer';
import { Link } from 'react-router-dom';
import { mapType } from '../constants/const';
import { useAppDispatch, useAppSelector } from '../../hooks/index';
import { changeFavorite, fetchOfferAction } from '../../store/api-actions';
import { changeSelectedPoint } from '../../store/offer-process/offer-process';
import { getFavorites } from '../../store/favorite-process/selector';
import { getAuthorizationStatus } from '../../store/user-process/selector';
import { AuthorizationStatus } from '../constants/status';
import { redirectToRoute } from '../../store/action';
import { AppRoute } from '../constants/app-route';

type OffersProps = {
  offer: Offer;
  cardType: 'default' | 'near' | 'favorite';
}

function OfferCardComponent({offer, cardType}: OffersProps): JSX.Element {
  const dispatch = useAppDispatch();
  const favorites = useAppSelector(getFavorites);
  const clickHandleTitleOffer = () => {
    dispatch(fetchOfferAction(offer.id));
  };
  const status = useAppSelector(getAuthorizationStatus);
  const handleAddFavorite = () => {
    if (status === AuthorizationStatus.NoAuthorization) {
      dispatch(redirectToRoute(AppRoute.Login));
    } else {
      dispatch(changeFavorite({
        favorites: favorites,
        offerId: offer.id,
        status: favorites.includes(offer.id) ? 0 : 1
      }));
    }
  };
  const handleOnMouseEnter = () => {
    if (cardType === 'default') {
      dispatch(changeSelectedPoint(offer.location));
    }
  };

  const handleOnMouseLeave = () => {
    if (cardType === 'default') {
      dispatch(changeSelectedPoint(undefined));
    }
  };

  return (
    <article className={`${mapType.get(cardType) }`} onMouseEnter={handleOnMouseEnter} onMouseLeave={handleOnMouseLeave}>
      {offer.isPremium && (
        <div className="place-card__mark">
          <span>Premium</span>
        </div>
      )}
      <div className={`${cardType === 'favorite' ? 'favorites' : 'cities'}__image-wrapper place-card__image-wrapper`}>
        <a>
          <img className="place-card__image" src={offer.previewImage} width={cardType === 'favorite' ? '150' : '260'} height={cardType === 'favorite' ? '110' : '200'} alt="Place image" />
        </a>
      </div>
      <div className={(cardType === 'favorite') ? 'favorites__card-info place-card__info' : 'place-card__info'}>
        <div className="place-card__price-wrapper">
          <div className="place-card__price">
            <b className="place-card__price-value">&euro;{offer.price}</b>
            <span className="place-card__price-text">&#47;&nbsp;night</span>
          </div>
          <button className={favorites.includes(offer.id) ? 'place-card__bookmark-button place-card__bookmark-button--active button' : 'place-card__bookmark-button button'} type="button" onClick={handleAddFavorite}>
            <svg className="place-card__bookmark-icon" width="18" height="19">
              <use xlinkHref="#icon-bookmark"></use>
            </svg>
            <span className="visually-hidden">To bookmarks</span>
          </button>
        </div>
        <div className="place-card__rating rating">
          <div className="place-card__stars rating__stars">
            <span style={{ width: `${Math.round((offer.rating / 5) * 100 / 20) * 20}%` }}></span>
            <span className ="visually-hidden">Rating</span>
          </div>
        </div>
        <h2 className ="place-card__name" onClick={clickHandleTitleOffer}>
          <Link to={`/offer/${offer.id}`}>{offer.title}</Link>
        </h2>
        <p className ="place-card__type">{offer.type}</p>
      </div>
    </article>
  );
}

const OfferCard = memo(OfferCardComponent);

export default OfferCard;
