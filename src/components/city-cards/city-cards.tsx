import { Offer } from '../types/offer';
import { Link } from 'react-router-dom';
import { AppClasses } from '../constants/classes';

type OffersProps = {
  offer: Offer;
  isMainScreen: boolean;
  mouseCursor(id:number): void;
}

function CityCard({offer, isMainScreen, mouseCursor}: OffersProps): JSX.Element {
  return (
    <article className={isMainScreen ? AppClasses.NoteMain : AppClasses.NoteProperty}
      id ={offer.id.toString()}
      onMouseOver={(evt)=> {
        const target = evt.currentTarget as HTMLElement;
        mouseCursor(+target.id);
      }}
    >
      {isMainScreen &&
        <div className="place-card__mark">
          <span>{offer.isPremium ? 'Premium' : ''}</span>
        </div>}
      <div className={isMainScreen ? AppClasses.ImagePackingMain : AppClasses.ImagePackingProperty}>
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
