import { Offer } from '../types/offer';
import { Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks/index';
import { changeFavorite, fetchOfferAction } from '../../store/api-actions';
import { changeSelectedPoint } from '../../store/offer-process/offer-process';
import { getFavorites } from '../../store/favorite-process/selector';
import { memo } from 'react';

type OffersProps = {
  offer: Offer;
  cardType: 'default' | 'near';
}

function CityCardComponent({offer, cardType}: OffersProps): JSX.Element {
  const dispatch = useAppDispatch();
  const favorites = useAppSelector(getFavorites);
  const clickHandleTitleOffer = () => {
    dispatch(fetchOfferAction(offer.id));
  };
  const handleAddFavorite = () => {
    dispatch(changeFavorite({
      favorites: favorites,
      offerId: offer.id,
      status: favorites.includes(offer.id) ? 0 : 1
    }));
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
    <article className={`${cardType === 'default' ? 'cities__card place-card' : 'near-places__card place-card'}`} onMouseEnter={handleOnMouseEnter} onMouseLeave={handleOnMouseLeave}>
      {offer.isPremium && (
        <div className="place-card__mark">
          <span>Premium</span>
        </div>
      )}
      <div className="cities__image-wrapper place-card__image-wrapper">
        <a href="#">
          <img className="place-card__image" src={offer.previewImage} width="260" height="200" alt="Place image" />
        </a>
      </div>
      <div className="place-card__info">
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
            <span style={{ width: `${(offer.rating / 5) * 100}%` }}></span>
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

const CityCard = memo(CityCardComponent);

export default CityCard;
