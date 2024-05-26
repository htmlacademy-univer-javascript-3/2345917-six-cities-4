import {useAppSelector} from '../../hooks/index';
import './message-error.css';

function MessageError(): JSX.Element | null {
  const error = useAppSelector((state) => state.error);

  return (error)
    ? <div className='message-error'>{error}</div>
    : null;

}

export default MessageError;
