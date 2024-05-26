import {Navigate} from 'react-router-dom';
import { AppRoute } from '../../constants/app-route';
import { AuthorizationStatus } from '../../constants/status';
import { getAuthorizationStatus } from '../../../store/user-process/selector';
import { useAppSelector } from '../../../hooks';

type PrivateRouteProps = {
  children: JSX.Element;
}

function PrivateRoute(props: PrivateRouteProps): JSX.Element {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const authorizationStatus = useAppSelector(getAuthorizationStatus);
  const { children } = props;

  return (
    authorizationStatus === AuthorizationStatus.Authorization
      ? children
      : <Navigate to={AppRoute.Login}/>
  );
}

export default PrivateRoute;
