import { FormEvent, useRef } from 'react';
import { useAppDispatch, useAppSelector } from '../../../hooks/index';
import { loginAction } from '../../../store/api-actions';
import { AuthorizationStatus } from '../../../components/constants/status';
import { getAuthorizationStatus } from '../../../store/user-process/selector';
import { AppRoute } from '../../../components/constants/app-route';
import { Link } from 'react-router-dom';

function LoginScreen(): JSX.Element{
  const loginRef = useRef<HTMLInputElement | null>(null);
  const passwordRef = useRef<HTMLInputElement | null>(null);
  const dispatch = useAppDispatch();
  const status = useAppSelector(getAuthorizationStatus);
  if (status === AuthorizationStatus.Authorization) {
    window.location.href = AppRoute.Main;
  }
  const handleSubmit = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    if (loginRef.current !== null && passwordRef.current !== null) {
      dispatch(
        loginAction({
          email: loginRef.current.value,
          password: passwordRef.current.value,
        })
      );
    }
  };
  return (
    <div className="page page--gray page--login">
      <header className="header">
        <div className="container">
          <div className="header__wrapper">
            <div className="header__left">
              <Link to="/" className="header__logo-link">
                <img className="header__logo" src="img/logo.svg" alt="6 cities logo" width="81" height="41"/>
              </Link>
            </div>
          </div>
        </div>
      </header>

      <main className="page__main page__main--login">
        <div className="page__login-container container">
          <section className="login">
            <h1 className="login__title">Sign in</h1>
            <form className="login__form form" action="#" method="post" onSubmit={handleSubmit}>
              <div className="login__input-wrapper form__input-wrapper">
                <label className="visually-hidden">E-mail</label>
                <input className="login__input form__input" type="email" name="email" placeholder="Email" ref={loginRef} required/>
              </div>
              <div className="login__input-wrapper form__input-wrapper">
                <label className="visually-hidden">Password</label>
                <input className="login__input form__input" type="password" name="password" placeholder="Password" ref={passwordRef} required/>
              </div>
              <button className="login__submit form__submit button" type="submit">Sign in</button>
            </form>
          </section>
        </div>
      </main>
    </div>
  );
}

export default LoginScreen;
