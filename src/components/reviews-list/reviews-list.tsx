import { Review } from '../types/review';
import ReviewItem from '../review/review';

type ReviewListProps = {
  reviews: Review[] | undefined;
};

function ReviewsList({reviews}: ReviewListProps): JSX.Element {
  const shownReviews = reviews?.slice(0, 10);
  return (
    <section className="offer__reviews reviews">
      <h2 className="reviews__title">Reviews &middot; <span className="reviews__amount">{shownReviews?.length}</span></h2>
      <ul className="reviews__list">
        {reviews?.slice().sort((rA, rB) => {
          const dateA = new Date(rA.date).getTime();
          const dateB = new Date(rB.date).getTime();
          return dateB - dateA;
        }).slice(0, 10).map((review) => (
          <ReviewItem key={review.id} review={review} />
        ))}
      </ul>
    </section>
  );
}

export default ReviewsList;
