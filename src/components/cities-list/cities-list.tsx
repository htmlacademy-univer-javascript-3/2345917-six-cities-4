import { useAppDispatch } from '../../hooks/index';
import { changeCity } from '../../store/action';
import { cities } from '../../components/constants/const';

type CityListProps = {
  chosenCity: string;
}

function CityList({chosenCity}: CityListProps): JSX.Element {
  const dispatch = useAppDispatch();
  return(
    <ul className="locations__list tabs__list">
      {cities.map((city) => (
        <li className="locations__item" key={city}>
          <a className={`locations__item-link tabs__item ${(city === chosenCity) ? 'tabs__item--active' : 'tabs__item--incative'}`} onClick={() => dispatch(changeCity(city))}>
            <span>{city}</span>
          </a>
        </li>
      ))}
    </ul>
  );
}

export default CityList;
