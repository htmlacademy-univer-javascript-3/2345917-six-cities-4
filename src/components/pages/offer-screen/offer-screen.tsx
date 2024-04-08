import { Link } from 'react-router-dom';
import CommentForm from '../../sending-comment-form/sending-comment-form';
import { Review } from '../../types/review';
import ReviewsList from '../../review-list/review-list';
import Map from '../../map/map';
import { offers } from '../../mocks/offers';
import CityCardList from '../../offer-list/offer-list';
import { useParams } from 'react-router-dom';
import { useState } from 'react';

type OfferScreenProps = {
  reviews: Review[];
}

function OfferScreen({reviews}: OfferScreenProps): JSX.Element{
  const {id} = useParams();
  const [{title, description, isFavorite, isPremium, type, rating, numberOfBedrooms, maxNumberOfGuests, price, householdItems, autor}] = offers.filter((offer) => offer.id.toString() === id);
  const [activeCard, pushActiveCard] = useState(0);
  return (
    <div className ="page">
      <header className ="header">
        <div className ="container">
          <div className ="header__wrapper">
            <div className ="header__left">
              <Link to = '/' className ="header__logo-link">
                <img className ="header__logo" src="img/logo.svg" alt="6 cities logo" width="81" height="41"/>
              </Link>
            </div>
            <nav className ="header__nav">
              <ul className ="header__nav-list">
                <li className ="header__nav-item user">
                  <a className ="header__nav-link header__nav-link--profile" href="#">
                    <div className ="header__avatar-wrapper user__avatar-wrapper"></div>
                    <span className ="header__user-name user__name">Oliver.conner@gmail.com</span>
                    <Link to="/favorites">
                      <span className="header__favorite-count">3</span>
                    </Link>
                  </a>
                </li>
                <li className ="header__nav-item">
                  <a className ="header__nav-link" href="#">
                    <span className ="header__signout">Sign out</span>
                  </a>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </header>

      <main className ="page__main page__main--offer">
        <section className ="offer">
          <div className ="offer__gallery-container container">
            <div className ="offer__gallery">
              <div className ="offer__image-wrapper">
                <img className ="offer__image" src="img/room.jpg" alt="Photo studio"/>
              </div>
              <div className ="offer__image-wrapper">
                <img className ="offer__image" src="img/apartment-01.jpg" alt="Photo studio"/>
              </div>
              <div className ="offer__image-wrapper">
                <img className ="offer__image" src="img/apartment-02.jpg" alt="Photo studio"/>
              </div>
              <div className ="offer__image-wrapper">
                <img className ="offer__image" src="img/apartment-03.jpg" alt="Photo studio"/>
              </div>
              <div className ="offer__image-wrapper">
                <img className ="offer__image" src="img/studio-01.jpg" alt="Photo studio"/>
              </div>
              <div className ="offer__image-wrapper">
                <img className ="offer__image" src="img/apartment-01.jpg" alt="Photo studio"/>
              </div>
            </div>
          </div>
          <div className ="offer__container container">
            <div className ="offer__wrapper">
              <div className ="offer__mark">
                <span>{isPremium ? 'Premium' : ''}</span>
              </div>
              <div className ="offer__name-wrapper">
                <h1 className ="offer__name">
                  {title}
                </h1>
                <button className ={`"offer__bookmark-button button" ${isFavorite ? 'offer__bookmark-button--active' : ''}`} type="button">
                  <svg className ="offer__bookmark-icon" width="31" height="33">
                    <use xlinkHref="#icon-bookmark"></use>
                  </svg>
                  <span className ="visually-hidden">To bookmarks</span>
                </button>
              </div>
              <div className ="offer__rating rating">
                <div className ="offer__stars rating__stars">
                  <span style={{width: `${(rating / 5) * 100}%`}}></span>
                  <span className ="visually-hidden">Rating</span>
                </div>
                <span className ="offer__rating-value rating__value">{rating}</span>
              </div>
              <ul className ="offer__features">
                <li className ="offer__feature offer__feature--entire">
                  {type}
                </li>
                <li className ="offer__feature offer__feature--bedrooms">
                  {`${numberOfBedrooms} Bedrooms`}
                </li>
                <li className ="offer__feature offer__feature--adults">
                  {`Max ${maxNumberOfGuests} adults`}
                </li>
              </ul>
              <div className ="offer__price">
                <b className ="offer__price-value">&euro;{price}</b>
                <span className ="offer__price-text">&nbsp;night</span>
              </div>
              <div className ="offer__inside">
                <h2 className ="offer__inside-title">What&apos;s inside</h2>
                <ul className ="offer__inside-list">
                  <li className ="offer__inside-item">
                    {householdItems}
                  </li>
                </ul>
              </div>
              <div className ="offer__host">
                <h2 className ="offer__host-title">Meet the host</h2>
                <div className ="offer__host-user user">
                  <div className ="offer__avatar-wrapper offer__avatar-wrapper--pro user__avatar-wrapper">
                    <img className ="offer__avatar user__avatar" src="img/avatar-angelina.jpg" width="74" height="74" alt="Host avatar"/>
                  </div>
                  <span className ="offer__user-name">
                    {autor.avatar}
                  </span>
                  <span className ="offer__user-status">
                    {autor.isPro ? 'Pro' : ''}
                  </span>
                </div>
                <div className ="offer__description">
                  {description.split('.').map((sentense) => (
                    <p className="offer__text" key={sentense}>
                      {sentense}
                    </p>
                  ))}
                </div>
              </div>
              <section className ="offer__reviews reviews">
                <h2 className ="reviews__title">Reviews &middot; <span className ="reviews__amount">{reviews.length}</span></h2>
                <ReviewsList reviews={reviews}/>
                <CommentForm />
              </section>
            </div>
          </div>
          <section className ="offer__map map">
            <Map isMainScreen = {false} offers={offers} activeCard={activeCard}/>
          </section>
        </section>
        <div className ="container">
          <section className ="near-places places">
            <h2 className ="near-places__title">Other places in the neighbourhood</h2>
            <div className ="near-places__list places__list">
              <CityCardList isMainScreen = {false} offers={offers.slice(0,3)} pushActiveCard={pushActiveCard}/>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}

export default OfferScreen;
