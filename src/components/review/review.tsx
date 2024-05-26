import { useMemo } from 'react';
import { Review } from '../types/review';
import { getCommentDate } from '../../components/constants/const';

type ReviewProps = {
  review: Review;
};

function ReviewItem({review}: ReviewProps): JSX.Element {
  const getCommentDateMemo = useMemo(() => getCommentDate(review.date.split('-').splice(0, 2)), [review]);
  return (
    <li className="reviews__item" key={review.id}>
      <div className="reviews__user user">
        <div className="reviews__avatar-wrapper user__avatar-wrapper">
          <img className="reviews__avatar user__avatar" src={review.user.avatarUrl} width="54" height="54"
            alt="Reviews avatar"
          />
        </div>
        <span className="reviews__user-name"> {review.user.name} </span>
      </div>
      <div className="reviews__info">
        <div className="reviews__rating rating">
          <div className="reviews__stars rating__stars">
            <span style={{width: `${review.rating / 5 * 100}%`}}></span>
            <span className="visually-hidden">Rating</span>
          </div>
        </div>
        <p className="reviews__text">
          {review.comment}
        </p>
        <time className="reviews__time" >{getCommentDateMemo}</time>
      </div>
    </li>
  );
}

export default ReviewItem;
