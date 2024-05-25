import { City } from '../../components/types/offer';
import { cities } from '../../components/mocks/cities';
import { useAppDispatch } from '../../hooks/index';
import { changeCity } from '../../store/action';

type CityListProps = {
  chosenCity: City;
}

function CityList({chosenCity}: CityListProps): JSX.Element {
  const dispatch = useAppDispatch();
  return(
    <ul className="locations__list tabs__list">
      {cities.map((city) => (
        <li className="locations__item" key={city.name}>
          <a className={`locations__item-link tabs__item ${(city === chosenCity) ? 'tabs__item--active' : ''}`} onClick={() => dispatch(changeCity(city))}>
            <span>{city.name}</span>
          </a>
        </li>
      ))}
    </ul>
  );
}

export default CityList;
