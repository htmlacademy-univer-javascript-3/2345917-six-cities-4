import { Offer } from '../types/offer';
import { Link } from 'react-router-dom';

type OffersProps = {
  offer: Offer;
  cardsType: 'default' | 'near';
}

function CityCard({offer, cardsType}: OffersProps): JSX.Element {
  return (
    <article className ={`${cardsType === 'default' ? 'cities__card place-card' : 'near-places__card place-card'}`}>
      {offer.isPremium && (
        <div className="place-card__mark">
          <span>Premium</span>
        </div>
      )}
      <div className ="cities__image-wrapper place-card__image-wrapper">
        <a href="#">
          <img className ="place-card__image" src={offer.previewImage[0]} width="260" height="200" alt="Place image"/>
        </a>
      </div>
      <div className ="place-card__info">
        <div className ="place-card__price-wrapper">
          <div className ="place-card__price">
            <b className ="place-card__price-value">&euro;{offer.price}</b>
            <span className ="place-card__price-text">&#47;&nbsp;night</span>
          </div>
          <button className ={offer.isFavorite ? 'place-card__bookmark-button place-card__bookmark-button--active button' : 'place-card__bookmark-button button'} type="button">
            <svg className ="place-card__bookmark-icon" width="18" height="19">
              <use xlinkHref ="#icon-bookmark"></use>
            </svg>
            <span className ="visually-hidden">In bookmarks</span>
          </button>
        </div>
        <div className ="place-card__rating rating">
          <div className ="place-card__stars rating__stars">
            <span style ={{width: `${(offer.rating / 5) * 100}%`}}></span>
            <span className ="visually-hidden">Rating</span>
          </div>
        </div>
        <h2 className ="place-card__name">
          <Link to={`/offer/${offer.id}`}>{offer.title}</Link>
        </h2>
        <p className ="place-card__type">{offer.type}</p>
      </div>
    </article>
  );
}

export default CityCard;
