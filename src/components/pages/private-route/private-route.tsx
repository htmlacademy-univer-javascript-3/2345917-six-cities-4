import {Navigate} from 'react-router-dom';
import { Direction } from '../../constants/direction';
import { AuthorizationStatus } from '../../constants/status';
import { useAppSelector } from '../../../hooks';

type PrivateRouteProps = {
  children: JSX.Element;
}

function PrivateRoute(props: PrivateRouteProps): JSX.Element {
  const authorizationStatus = useAppSelector((state) => state.authorizationStatus);
  const { children } = props;

  return (
    authorizationStatus === AuthorizationStatus.Authorization
      ? children
      : <Navigate to={Direction.Login}/>
  );
}

export default PrivateRoute;
