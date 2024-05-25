import { Review } from '../types/review';
import ReviewItem from '../review/review';

type ReviewListProps = {
  reviews: Review[];
};

function ReviewsList({reviews}: ReviewListProps): JSX.Element {
  return (
    <ul className="reviews__list">
      {reviews.map((review) => (
        <ReviewItem key={review.id} review={review}/>
      ))}
    </ul>
  );
}

export default ReviewsList;
