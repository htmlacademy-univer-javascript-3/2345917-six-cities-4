import {Navigate} from 'react-router-dom';
import { Status } from '../../constants/status';
import { Direction } from '../../constants/direction';

type PrivateRouteProps = {
  authorizationStatus: Status;
  children: JSX.Element;
}

function PrivateRoute(props: PrivateRouteProps): JSX.Element {
  const {authorizationStatus, children} = props;

  return (
    authorizationStatus === Status.Authorization
      ? children
      : <Navigate to={Direction.Login}/>
  );
}

export default PrivateRoute;
