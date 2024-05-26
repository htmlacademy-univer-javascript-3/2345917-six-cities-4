/* eslint-disable @typescript-eslint/no-unsafe-return */
import CommentForm from '../../sending-comment-form/sending-comment-form';
import ReviewsList from '../../../components/reviews-list/reviews-list';
import Map from '../../../components/map/map';
import CityCardList from '../../../components/offer-list/offer-list';
import LoadingScreen from '../loading-screen/loading-screen';
import { AuthorizationStatus } from '../../../components/constants/status';
import { useAppSelector } from '../../../hooks/index';
import Header from '../../../components/header/header';

function OfferScreen(): JSX.Element {
  const selectedOffer = useAppSelector((state) => state.selectedOffer);
  const offerData = selectedOffer?.offerData;
  const offers = useAppSelector((state) => state.offers);
  const nearbyOffers = selectedOffer?.nearbyOffers;
  const authorizationStatus = useAppSelector((state) => state.authorizationStatus);
  const rating = useAppSelector((state) => state.selectedOffer?.offerData.rating);
  const isSelectedOfferDataLoading = useAppSelector((state) => state.isSelectedOfferDataLoading);
  if (isSelectedOfferDataLoading) {
    return (
      <LoadingScreen />
    );
  }
  return (
    <div className ="page">
      <Header />
      <main className ="page__main page__main--offer">
        <section className ="offer">
          <div className ="offer__gallery-container container">
            <div className ="offer__gallery">
              {offerData?.images.map((image) => (
                <div className="offer__image-wrapper" key={image}>
                  <img className="offer__image" src={image} alt="Photo studio" />
                </div>
              ))}
            </div>
          </div>
          <div className ="offer__container container">
            <div className ="offer__wrapper">
              {offerData?.isPremium && (
                <div className ="offer__mark">
                  <span>Premium</span>
                </div>
              )}
              <div className ="offer__name-wrapper">
                <h1 className ="offer__name">
                  {offerData?.title}
                </h1>
                <button className ={offerData?.isFavorite ? 'offer__bookmark-button--active button' : 'offer__bookmark-button button'} type="button">
                  <svg className ="offer__bookmark-icon" width="31" height="33">
                    <use xlinkHref="#icon-bookmark"></use>
                  </svg>
                  <span className ="visually-hidden">To bookmarks</span>
                </button>
              </div>
              <div className ="offer__rating rating">
                <div className ="offer__stars rating__stars">
                  <span style={{width: `${rating ? (rating / 5) * 100 : ''}%`}}></span>
                  <span className ="visually-hidden">Rating</span>
                </div>
                <span className ="offer__rating-value rating__value">{rating}</span>
              </div>
              <ul className ="offer__features">
                <li className ="offer__feature offer__feature--entire">
                  {offerData?.type}
                </li>
                <li className ="offer__feature offer__feature--bedrooms">
                  {offerData?.bedrooms}
                </li>
                <li className ="offer__feature offer__feature--adults">
                  {offerData?.maxAdults}
                </li>
              </ul>
              <div className ="offer__price">
                <b className ="offer__price-value">&euro;{offerData?.price}</b>
                <span className ="offer__price-text">&nbsp;night</span>
              </div>
              <div className ="offer__inside">
                <h2 className ="offer__inside-title">What&apos;s inside</h2>
                <ul className ="offer__inside-list">
                  {offerData?.goods.map((item) => (
                    <li className="offer__inside-item" key={item}>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div className ="offer__host">
                <h2 className ="offer__host-title">Meet the host</h2>
                <div className ="offer__host-user user">
                  <div className ="offer__avatar-wrapper offer__avatar-wrapper--pro user__avatar-wrapper">
                    <img className ="offer__avatar user__avatar" src={offerData?.host.avatarUrl} width="74" height="74" alt="Host avatar"/>
                  </div>
                  <span className ="offer__user-name">
                    {offerData?.host.name}
                  </span>
                  <span className ="offer__user-status">
                    {offerData?.host.isPro}
                  </span>
                </div>
                <div className ="offer__description">
                  <p className ="offer__text">
                    {offerData?.description}
                  </p>
                </div>
              </div>
              <section className ="offer__reviews reviews">
                <h2 className="reviews__title">Reviews &middot; <span className="reviews__amount">{selectedOffer?.reviews.length}</span></h2>
                <ReviewsList reviews={selectedOffer?.reviews} />
                {authorizationStatus === AuthorizationStatus.Authorization &&
                  <CommentForm />}
              </section>
            </div>
          </div>
          <section className ="offer__map map">
            <Map points={nearbyOffers ? selectedOffer?.nearbyOffers.map((of) => of.location).slice(0, 3).concat(selectedOffer.offerData.location) : []} city={nearbyOffers ? selectedOffer?.nearbyOffers[0].city : offers[0].city} />
          </section>
        </section>
        <div className ="container">
          <section className ="near-places places">
            <h2 className ="near-places__title">Other places in the neighbourhood</h2>
            <CityCardList offers={nearbyOffers?.slice(0, 3)} listType={'near'}/>
          </section>
        </div>
      </main>
    </div>
  );
}

export default OfferScreen;
