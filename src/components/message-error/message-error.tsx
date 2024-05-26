import {useAppSelector} from '../../hooks/index';
import './message-error.css';
import { getError } from '../../store/error-process/selector';

function MessageError(): JSX.Element | null {
  const error = useAppSelector(getError);

  return (error)
    ? <div className='message-error'>{error}</div>
    : null;

}

export default MessageError;
