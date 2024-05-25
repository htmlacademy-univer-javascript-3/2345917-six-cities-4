import { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/index';
import { changeSorting } from '../../store/action';

function SortingForm(): JSX.Element {
  const [isOpened, setIsOpened] = useState(false);
  const sortingType = useAppSelector((state) => state.sortingType);
  const dispatch = useAppDispatch();
  const handleSortingTypeChange = (type: string) => {
    dispatch(changeSorting(type));
    setIsOpened(false);
  };
  return (
    <form className="places__sorting" action="#" method="get">
      <span className="places__sorting-caption">Sort by </span>
      <span className="places__sorting-type" tabIndex={0} onClick={() => setIsOpened(!isOpened)}>
        {sortingType}
        <svg className="places__sorting-arrow" width="7" height="4">
          <use xlinkHref="#icon-arrow-select"></use>
        </svg>
      </span>
      <ul className={`places__options places__options--custom ${isOpened ? 'places__options--opened' : ''}`}>
        <li className={`places__option ${sortingType === 'Popular' ? 'places__option--active' : ''}`} onClick={() => handleSortingTypeChange('Popular')} tabIndex={0}>Popular</li>
        <li className={`places__option ${sortingType === 'Price: low to high' ? 'places__option--active' : ''}`} onClick={() => handleSortingTypeChange('Price: low to high')} tabIndex={0}>Price: low to high</li>
        <li className={`places__option ${sortingType === 'Price: high to low' ? 'places__option--active' : ''}`} onClick={() => handleSortingTypeChange('Price: high to low')} tabIndex={0}>Price: high to low</li>
        <li className={`places__option ${sortingType === 'Top rated first' ? 'places__option--active' : ''}`} onClick={() => handleSortingTypeChange('Top rated first')} tabIndex={0}>Top rated first</li>
      </ul>
    </form>
  );
}

export default SortingForm;
