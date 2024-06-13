import { Review } from '../types/review';
import ReviewItem from '../review/review';
import { REVIEWS_COUNT } from '../constants/const';

type ReviewListProps = {
  reviews: Review[] | undefined;
};

function ReviewsList({reviews}: ReviewListProps): JSX.Element {
  return (
    <section className="offer__reviews reviews">
      <h2 className="reviews__title">Reviews &middot; <span className="reviews__amount">{reviews?.length}</span></h2>
      <ul className="reviews__list">
        {reviews?.slice().sort((rA, rB) => {
          const dateA = new Date(rA.date).getTime();
          const dateB = new Date(rB.date).getTime();
          return dateB - dateA;
        }).slice(0, REVIEWS_COUNT).map((review) => (
          <ReviewItem key={review.id} review={review} />
        ))}
      </ul>
    </section>
  );
}

export default ReviewsList;
