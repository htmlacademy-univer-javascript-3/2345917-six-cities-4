import { ChangeEvent, useState, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { postComment } from '../../store/api-actions';
import { getSelectedOffer, getIsCommentPosting, getIsCommentRejected } from '../../store/selected-offer-process/selector';

type Rating = {
  rating: number;
  comment: string;
}

function CommentForm() {
  const [formState, setFormState] = useState<Rating>({
    rating: 0,
    comment: '',
  });

  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  const isCommentPosting = useAppSelector(getIsCommentPosting);
  const isCommentRejected = useAppSelector(getIsCommentRejected);
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const id = useAppSelector(getSelectedOffer)?.offerData.id;
  const dispatch = useAppDispatch();

  const handleCommentSubmit = () => {
    dispatch(postComment({comment: formState.comment, rating: formState.rating, offerId: id}));
  };

  useEffect(() => {
    if (!isCommentRejected) {
      setFormState((prevState) => ({
        ...prevState,
        rating: 0,
        comment: ''
      }));
    }
  }, [isCommentRejected]);

  const handleCommentChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setFormState((prevState) => ({
      ...prevState,
      comment: e.target.value,
    }));
  };

  const handleRatingChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormState((prevState) => ({
      ...prevState,
      rating: Number(e.target.value),
    }));

  };

  return (

    <form className="reviews__form form" method="post">
      <label className="reviews__label form__label" htmlFor="review">Your review</label>
      <div className="reviews__rating-form form__rating">
        <input className="form__rating-input visually-hidden" name="rating" value="5" id="5-stars" type="radio" onChange={handleRatingChange} checked={formState.rating === 5}/>
        <label htmlFor="5-stars" className="reviews__rating-label form__rating-label" title="perfect">
          <svg className="form__star-image" width="37" height="33">
            <use xlinkHref="#icon-star"></use>
          </svg>
        </label>

        <input className="form__rating-input visually-hidden" name="rating" value="4" id="4-stars" type="radio" onChange={handleRatingChange} checked={formState.rating === 4}/>
        <label htmlFor="4-stars" className="reviews__rating-label form__rating-label" title="good">
          <svg className="form__star-image" width="37" height="33">
            <use xlinkHref="#icon-star"></use>
          </svg>
        </label>

        <input className="form__rating-input visually-hidden" name="rating" value="3" id="3-stars" type="radio" onChange={handleRatingChange} checked={formState.rating === 3}/>
        <label htmlFor="3-stars" className="reviews__rating-label form__rating-label" title="not bad">
          <svg className="form__star-image" width="37" height="33">
            <use xlinkHref="#icon-star"></use>
          </svg>
        </label>

        <input className="form__rating-input visually-hidden" name="rating" value="2" id="2-stars" type="radio" onChange={handleRatingChange} checked={formState.rating === 2}/>
        <label htmlFor="2-stars" className="reviews__rating-label form__rating-label" title="badly">
          <svg className="form__star-image" width="37" height="33">
            <use xlinkHref="#icon-star"></use>
          </svg>
        </label>

        <input className="form__rating-input visually-hidden" name="rating" value="1" id="1-star" type="radio" onChange={handleRatingChange} checked={formState.rating === 1}/>
        <label htmlFor="1-star" className="reviews__rating-label form__rating-label" title="terribly">
          <svg className="form__star-image" width="37" height="33">
            <use xlinkHref="#icon-star"></use>
          </svg>
        </label>
      </div>
      <textarea className="reviews__textarea form__textarea" id="review" name="review" value={formState.comment} onChange={handleCommentChange} placeholder="Tell how was your stay, what you like and what can be improved"></textarea>
      <div className="reviews__button-wrapper">
        <p className="reviews__help">
          To submit review please make sure to set <span className="reviews__star">rating</span> and describe your stay with at least <b className="reviews__text-amount">50 characters</b>.
        </p>
        <button className="reviews__submit form__submit button" type="button" onClick={handleCommentSubmit} disabled={formState.comment.length < 50 || formState.comment.length > 300 || formState.rating === 0 || isCommentPosting}>Submit</button>
      </div>
    </form>
  );
}

export default CommentForm;
